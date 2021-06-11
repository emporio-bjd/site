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
import { isCompositeComponent } from 'react-dom/test-utils'

function Provider() {

    const [wasChanged, setWasChanged] = useState(false)
    const [wasChangedProduct, setWasChangedProduct] = useState(false)
    const [data, setData] = useState([]);
    const [dataAlterProvider, setDataAlterProvider] = useState({

        company: '',
        name: '',
        email: '',
        phone: 0,
        products: data

    })

    const [selectProvider, setSelectProvider] = useState('')
    const [selectProviderToDelete, setSelectProviderToDelete] = useState('')

    const [selectedUnity, setSelectedUnity] = useState('')
    const [selectedItem, setSelectedItem] = useState('');

    const [imageUrl, setImageUrl] = useState('')
    const [dataAlterProduct, setDataAlterProduct] = useState({

        product: '',
        qntd: 0,
        unity: '',
        imageSrc: '',
        buyPrice: 0,
        sellPrice: 0,

    })

    const [selectProduct, setSelectProduct] = useState('')
    const [selectProductToDelete, setSelectProductToDelete] = useState('')

    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [dataKeysAdmProduct, setDataKeysAdmProduct] = useState([])
    const [dataProvider, setDataProvider] = useState([])

    const [newDataProvider, setNewDataProvider] = useState({

        company: '',
        name: '',
        email: '',
        phone: 0,
        products: data

    })

    const [dataProduct, setDataProduct] = useState([])
    const [newDataProduct, setNewDataProduct] = useState({

        product: '',
        unity: '',
        imageSrc: '',
        sellPrice: 0,
        buyPrice: 0

    })

    const [dataRequest, setDataRequest] = useState([])
    const [newDataRequest, setNewDataRequest] = useState({

        company: '',
        product: '',
        qntd: 0,

    })

    function handleInputProviderChange(event) {

        const { name, value } = event.target

        setNewDataProvider({

            ...newDataProvider, [name]: value,

        })

    }

    function handleInputProductChange(event) {

        const { name, value } = event.target

        setNewDataProduct({

            ...newDataProduct, [name]: value

        })

    }

    function handleInputProviderChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterProvider({

            ...dataAlterProvider, [name]: value

        })

    }

    function handleInputProductChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterProduct({

            ...dataAlterProduct, [name]: value

        })

    }

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

        var ref = firebase.database().ref('providers').child('products')

        var productKeys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            productKeys.push(snapshot.key);
        });

        setDataKeysAdmProduct(productKeys)

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

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

    }

    function handleSelectedUnity(event) {

        setSelectedUnity(event.target.value)

    }

    function handleSelectProduct(event) {

        setSelectProduct(event.target.value)

    }

    function handleSelectProductToDelete(event) {

        setSelectProductToDelete(event.target.value)
        console.log(selectProductToDelete)

    }

    function handleSelectProviderToDelete(event) {

        setSelectProviderToDelete(event.target.value)

    }

    function handleSelectedItem(event) {

        setSelectedItem(event.target.value)

    }

    function insertNewProvider() {

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('providers/' + id).set({

            company: newDataProvider.company,
            name: newDataProvider.name,
            email: newDataProvider.email,
            phone: newDataProvider.phone,
            id: id,
            products: [{}]

        })

        alert("Fornecedor cadastrado com sucesso!");

    }

    function insertNewProduct() {

        const id = firebase.database().ref().child('posts').push().key

        const data = {

            id: id,
            product: newDataProduct.product,
            imageSrc: imageUrl,
            unity: selectedUnity,
            sellPrice: newDataProduct.sellPrice,
            buyPrice: newDataProduct.buyPrice

        }

        firebase.database().ref('providers/' + dataKeysAdm[selectProvider])
            .child('products/' + id)
            .set(data)
            .then(err => console.log(err))
        alert("Produto cadastrado com sucesso!")

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

    function updateProvider() {

        if (wasChanged) {

            firebase.database().ref('providers/' + dataKeysAdm[selectProvider]).update({

                company: dataAlterProvider.company != '' ? dataAlterProvider.company : dataProvider[selectProvider].company,
                name: dataAlterProvider.name != '' ? dataAlterProvider.name : dataProvider[selectProvider].name,
                email: dataAlterProvider.email != '' ? dataAlterProvider.email : dataProvider[selectProvider].email,
                phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : dataProvider[selectProvider].phone,

            })
                .then(() => alert("Item atualizado com sucesso!"))
        }

    }

    function updateProduct() {

        if (wasChangedProduct) {

            firebase.database().ref('providers/' + dataKeysAdm[selectProvider]).child('/products' + dataKeysAdmProduct[selectProduct]).update({

                product: dataAlterProduct.product != '' ? dataAlterProduct.product : dataProduct[selectProduct].product,
                imageSrc: dataAlterProduct.imageSrc != '' ? dataAlterProduct.imageSrc :dataProduct[selectProduct].imageSrc,
                unity: dataAlterProduct.unity != '' ? dataAlterProduct.unity : dataProduct[selectProduct].unity,
                sellPrice: dataAlterProduct.sellPrice != '' ? dataAlterProduct.sellPrice : dataProduct[selectProduct].sellPrice,
                buyPrice: dataAlterProduct.buyPrice != '' ? dataAlterProduct.buyPrice : dataProduct[selectProduct].buyPrice,

            })
                .then(() => alert("Item atualizado com sucesso!"))
        }

    }

    function deleteProvider() {

        firebase.database()
            .ref('providers/' + dataKeysAdm[selectProviderToDelete])
            .remove()
            .then(() => alert("Item removido com sucesso!"))

    }

    function deleteProduct() {

        firebase.database()
            .ref('providers/' + dataKeysAdm[selectProvider])
            .child('products/' + dataKeysAdm[selectProductToDelete])
            .remove()
            .then(() => alert("Item removido com sucesso!"))

            console.log('providers/' + dataKeysAdm[selectProvider])
            console.log('products/' + dataKeysAdm[selectProductToDelete])

    }

    const [displayHistory, setDisplayHistory] = useState("none");
    const [HistoryData, setHistoryData] = useState({});
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {

        window.scrollTo(0, 0);
        setPageHeight(window.screen.height)

    }, []);

    function handleHistoryInfos() {

        setHistoryData();

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    function closeHistory() {

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    function uploadImage(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('images/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setImageUrl(url))
            });

    }

    return (

        <div className='Provider'>

            <Header />

            <div style={{ display: displayHistory }} tabindex="-1" role="dialog" className='divHistory' >
                <span onClick={closeHistory}>X</span>
                <ProviderInfo displayProperty={displayHistory} HistoryData={HistoryData} />
            </div>

            <main id='mainProvider' >

                <div className='titleProvider' >

                    <h1>O que deseja fazer?</h1>

                    <div className="btn-style">

                        <span onClick={() => { handleHistoryInfos() }}>Informação dos fornecedores</span>
                        <Link to='/AdminHistorico' >Histórico de pedidos</Link>
                        <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>

                    </div>

                </div>

                <div className='providerOptions' >

                    <fieldset className='registerSection' >

                        <legend className='registerTitle'>
                            <h2>Cadastrar fornecedor</h2>
                            <h5>Preencha os dados do fornecedor abaixo.</h5>
                        </legend>

                        <input name='company' onChange={handleInputProviderChange} placeholder='Nome da empresa' />

                        <input name='name' onChange={handleInputProviderChange} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputProviderChange} placeholder='E-mail' />

                        <input name='phone' onChange={handleInputProviderChange} placeholder='Telefone com DDD' />

                        <a onClick={() => { insertNewProvider() }} >Cadastrar</a>

                    </fieldset>

                    <fieldset className='greenBackGround' >

                        <legend>
                            <h2>Cadastrar produto</h2>
                            <h5>Selecione o fornecedor e preencha os dados do produto abaixo.</h5>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.company}</option>

                                )

                            })}

                        </select>

                        <legend>
                            <h3>Insira os dados do produto.</h3>
                        </legend>

                        <input name='product' onChange={handleInputProductChange} placeholder='Produto' />

                        <select name='unity' onChange={handleSelectedUnity} >

                            <option value='' >Selecione a unidade</option>
                            <option value='Quilograma' >Quilograma</option>
                            <option value='Unidade' >Unidade</option>

                        </select>

                        <input type='file' onChange={uploadImage} accept="image/png, image/jpeg" placeholder='Imagem' />

                        <input name='buyPrice' onChange={handleInputProductChange} placeholder='Preço de compra' />

                        <input name='sellPrice' onChange={handleInputProductChange} placeholder='Preço de venda' />

                        <a onClick={() => { insertNewProduct() }} >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar dados de fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.company}</option>

                                )

                            })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='company' onChange={handleInputProviderChangeAlter} placeholder='Fornecedor' />

                        <input name='name' onChange={handleInputProviderChangeAlter} placeholder='Nome de contato' />

                        <input name='email' onChange={handleInputProviderChangeAlter} placeholder='E-mail' />

                        <input name='phone' onChange={handleInputProviderChangeAlter} placeholder='Telefone' />

                        <a onClick={() => { setWasChanged(true); updateProvider(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar dados dos produtos cadastrados</h2>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.company}</option>

                                )


                            })}

                        </select>

                        <select onChange={handleSelectProduct} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index) => (

                                <option value={index} key={index}>{products.product}</option>

                            ))}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='product' onChange={handleInputProductChangeAlter} placeholder='Produto' />

                        <input name='imageSrc' onChange={handleInputProductChangeAlter} placeholder='Imagem' />

                        {/* <select name='unity' onChange={handleSelectedUnityChangeAlter} >
                            <option value='Não especificado' >Unidade de medida</option>
                            <option value='Quilograma' >Quilograma</option>
                            <option value='Unidade' >Unidade</option>
                        </select> */}

                        <input name='sellPrice' onChange={handleInputProductChangeAlter} placeholder='Valor de venda' />

                        <input name='buyPrice' onChange={handleInputProductChangeAlter} placeholder='Valor de compra' />

                        <a onClick={() => { setWasChangedProduct(true); updateProduct(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProviderToDelete} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option key={index} value={index} >{providers.company}</option>

                                )

                            })}

                        </select>

                        <a onClick={() => { deleteProvider() }} >Apagar</a>

                        <legend>
                            <h2>Apagar produto</h2>
                        </legend>

                        <select onChange={handleSelectProviderProducts} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option key={index} value={index} >{providers.company}</option>

                                )

                            })}

                        </select>

                        <select onChange={handleSelectProductToDelete} >

                            <option>Selecione o produto</option>

                            {itemsOfProvider.map((products, index) => (

                                <option value={index} key={index}>{products.product}</option>

                            ))}

                        </select>

                        <a onClick={() => { deleteProduct() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default Provider