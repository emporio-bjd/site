import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import ProviderInfo from '../../../components/providerInfo'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function ProviderRequests() {

    const [wasChanged, setWasChanged] = useState(false);
    const [data, setData] = useState([]);
    const [dataExists, setDataExists] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);
    const [selectProvider, setSelectProvider] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    var [selectedItems, setSelectedItems] = useState([]);
    const [dataProvider, setDataProvider] = useState([]);
    const [dataKeysAdm, setDataKeysAdm] = useState([])

    const [dataRequest, setDataRequest] = useState([])
    const [newDataRequest, setNewDataRequest] = useState({

        company: '',
        products: '',
        qntd: 0,

    })

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

    }

    function handleSelectedItem (event) {

        setSelectedItem(event.target.value)

    }

    function handleInputRequestChange(event) {

        const { name, value } = event.target

        setNewDataRequest({

            ...newDataRequest, [name]: value,

        })

    }

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('provider-products'))

        if (verify != null && verify.length > 1) {

            setData(verify)
            setDataExists(true)

            var total = 0

            verify.map((item) => {

                if (item.data != undefined) {

                    var value = (Number(item.data.price) * Number(item.amount))
                    total = value + total

                }

            })

        }
        else
            setDataExists(false)

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProvider(temp)

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("providers");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/products')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    var dataProductTemp = []

                    temp.map(item => {

                        if (item.products != undefined)
                            dataProductTemp.push(item.products)

                    })
                    console.log(dataProductTemp)
                    setDataProduct(dataProductTemp)

                } else {
                    console.log("No data available");
                }
            })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers-requests').get('/providers-requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataRequest(temp)

                }

            })

    }, [])

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

    }

    function handleSelectedItem(event) {

        setSelectedItem(event.target.value)

    }

    function insertNewRequest() {

        var confirm = window.confirm('Tem certeza que deseja finalizar o cadastro do pedido?')

        if (confirm) {

            const id = firebase.database().ref().child('posts').push().key

            firebase.database().ref('providers-requests/' + id).set({

                id: id,
                listItem: data

            }).then(() => {
                localStorage.setItem('provider-products', '[{}]')
                alert("Pedido finalizado com sucesso!")
                console.log(data.amount)
            })

        }

    }

    function addProduct() {

        selectedItems.push({
            amount: newDataRequest.qntd,
            data: JSON.parse(selectedItem)
        })

        alert("item inserido com sucesso!")

    }

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('provider-products'))

        if (listOfItems != null) {

            if (listOfItems === [{}]) {

                localStorage.removeItem('provider-products')
                const newItem = []
                newItem.push({ data: selectedItem.product, amount: newDataRequest.qntd })
                localStorage.setItem('provider-products', JSON.stringify(newItem))
                alert("Produto adicionado à lista de pedidos!")

            } else {

                const newItem = JSON.parse(localStorage.getItem('provider-products'))
                newItem.push({ data: selectedItem.product, amount: newDataRequest.qntd })
                localStorage.setItem('provider-products', JSON.stringify(newItem))
                alert("Produto adicionado à lista de pedidos!")

            }

        } else {

            const newItem = [{ data: selectedItem.product, amount: newDataRequest.qntd }]
            localStorage.setItem('provider-products', JSON.stringify(newItem))
            alert("Produto adicionado à lista de pedidos!")

        }

    }

    const [selectedUnity, setSelectedUnity] = useState('')

    function handleSelectedUnity(event) {

        setSelectedUnity(event.target.value)

    }

    const [itemsOfProvider, setItemsOfProvider] = useState([])

    function handleSelectProviderProducts(event) {

        var position = event.target.value

        setSelectProvider(position)

        var data = dataProvider[position].products

        if (data != undefined && data != null) {

            var items = Object.keys(data).map((key) => data[key])
            var temp = []

            items.map((products) => {

                console.log(products)
                temp.push(products)

            })

            setItemsOfProvider(temp)

        } else
            setItemsOfProvider([])

    }

    return (

        <div className='providerRequests'>

            <Header />

            <main id='mainProviderRequest' >

                <div className='requestOption' >

                    <fieldset className='orderRegister' >

                        <legend>
                            <h2>Realizar pedido</h2>
                            <h5>Selecione o fornecedor e o item que deseja inserir no pedido. Em seguida, insira a quantidade desejada.</h5>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.company}</option>

                                )


                            })}

                        </select>

                        <select onChange={handleSelectedItem} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index) => (

                                <option value={index} key={index}>{products.product} - R${products.buyPrice}</option>

                            ))}

                        </select>

                        <legend>
                            <h3>Insira a quantidade desejada</h3>
                        </legend>

                        <input name='qntd' onChange={handleInputRequestChange} placeholder='Quantidade' />

                        <a onClick={() => { addToCart() }} >Adicionar produto</a>
                        <a onClick={() => { insertNewRequest() }} >Finalizar pedido</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default ProviderRequests