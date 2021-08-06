import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/storage'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Admin() {

    const [wasChanged, setWasChanged] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [alteredImageUrl, setAlteredImageUrl] = useState('')
    const [dataAlterItem, setDataAlterItem] = useState({

        imageSrc: '',
        title: '',
        desc: '',
        price: '',
        itemAvailability: 0,
        unityPrice: '',
        category: '',
        unity: '',
        amountInStock: ''
        
    })

    const [selectItem, setSelectItem] = useState('')
    const [selectItemToDelete, setSelectItemToDelete] = useState('')

    const [dataAdmin, setDataAdmin] = useState([])
    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [newDataAdmin, setNewDataAdmin] = useState({

        imageSrc: '',
        title: '',
        desc: '',
        price: '',
        itemAvailability: 0,
        unityPrice: '',
        category: '',
        unity: '',
        amountInStock: ''

    })

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('items/');

        firebaseRef.on('value', (snapshot) => {
    
            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdmin(temp)
            }
            else {
                console.log("No data available");
            }
        })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("items");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysAdm(keys)

    }, []);

    function handleInputAdminChange(event) {

        const { name, value } = event.target

        console.log(name, value)

        setNewDataAdmin({

            ...newDataAdmin, [name]: value

        })

        console.log(newDataAdmin)

    }

    function handleInputAdminChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterItem({

            ...dataAlterItem, [name]: value

        })

    }

    function handleSelectItem(event) {

        setSelectItem(event.target.value)
        console.log(dataAdmin[event.target.value])

    }

    function handleSelectItemToDelete(event) {

        setSelectItemToDelete(event.target.value)

    }

    function insertNewItem() {

        const id = firebase.database().ref().child('items').push().key

        const data = {

            imageSrc: imageUrl,
            title: newDataAdmin.title,
            desc: newDataAdmin.desc,
            price: newDataAdmin.price,
            id: id,
            itemAvailability: newDataAdmin.itemAvailability,
            unityPrice: newDataAdmin.unityPrice,
            category: newDataAdmin.category,
            unity: newDataAdmin.unity == '' ? 'Unidade' : newDataAdmin.unity,
            amount: 0

        }

        firebase.database().ref('items/' + id)
        .set(data)
        .then(err => console.log(err))

        setNewDataAdmin({

            imageSrc: '',
            title: '',
            desc: '',
            price: '',
            itemAvailability: 0,
            unityPrice: '',
            category: '',
            unity: ''
    
        })
        alert("Item inserido com sucesso!.")
        
    }

    function updateItem() {

        if (wasChanged) {

            firebase.database()
            .ref('items/' + dataKeysAdm[selectItem])
            .update({

                imageSrc: alteredImageUrl != '' ? alteredImageUrl : dataAdmin[selectItem].imageSrc,
                title: dataAlterItem.title != '' ? dataAlterItem.title : dataAdmin[selectItem].title,
                desc: dataAlterItem.desc != '' ? dataAlterItem.desc : dataAdmin[selectItem].desc,
                price: dataAlterItem.price != 0 ? dataAlterItem.price : dataAdmin[selectItem].price,
                itemAvailability: dataAlterItem.itemAvailability != 0 ? dataAlterItem.itemAvailability : dataAdmin[selectItem].itemAvailability,
                unity: dataAlterItem.unity != 0 ? dataAlterItem.unity : dataAdmin[selectItem].unity,
                amountInStock: dataAlterItem.amountInStock != 0 ? dataAlterItem.amountInStock : dataAdmin[selectItem].amountInStock,

            })
            .then(() => alert("Item atualizado com sucesso!"))

        }

    }

    function deleteItem() {

        firebase.database()
            .ref('items/' + dataKeysAdm[selectItemToDelete])
            .remove()
            .then(() => alert("Item removido com sucesso!"))

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

    function uploadImageAltered(event) {

        const file = event.target.files[0]

        var storageRef = firebase.storage().ref();

        storageRef.child('images/' + file.name.trim())
            .put(file)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                    .then(url => setAlteredImageUrl(url))
            });

    }

    return (

        <div className='Admin'>

            <Header />

            <main id='mainAdmin' >

                <div className='adminOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo item</h2>
                        </legend>

                        <input name='title' onChange={handleInputAdminChange} placeholder='Nome' value={newDataAdmin.title}/>

                        <input name='desc' onChange={handleInputAdminChange} placeholder='Descrição' value={newDataAdmin.desc} />

                        <input name='price' onChange={handleInputAdminChange} placeholder='Preço por Kg' type='number' value={newDataAdmin.price} />

                        <input name='unityPrice' onChange={handleInputAdminChange} placeholder='Preço unitário' type='number' value={newDataAdmin.unityPrice} />

                        <input name='amountInStock' onChange={handleInputAdminChange} placeholder='Quantidade em estoque' type='number' value={newDataAdmin.amountInStock} />
                        
                        <input type='file' onChange={uploadImage} accept="image/png, image/jpeg" placeholder='Imagem'/>

                        <select onChange={handleInputAdminChange} name='unity' >

                            <option value='unidade' >Unidade</option>
                            <option value='kg' >Kg</option>
                            <option value='maco' >Maço</option>

                        </select>

                        <select onChange={handleInputAdminChange} name='itemAvailability' >

                            <option value={0} >Disponibilidade</option>
                            <option value={true} >Disponível</option>
                            <option value={false} >Indisponível</option>

                        </select>

                        <select onChange={handleInputAdminChange} name='category' value={newDataAdmin.category} >

                            <option value={0} >Categoria</option>
                            <option value="Diversos" >Diversos</option>
                            <option value="Panificação" >Panificação</option>
                            <option value="Processados" >Processados orgânicos</option>
                            <option value="Hortaliças orgânicas" >Hortaliças orgânicas</option>
                            <option value="Palmito pupunha congelado" >Palmito pupunha congelado</option>
                            <option value="Laticínios e tofu" >Laticínios e tofu</option>
                            <option value="Brotos e germinados" >Brotos e germinados</option>
                            <option value="Geleias sem edição de açúcar" >Geleias sem edição de açúcar</option>
                            <option value="Kombucha" >Kombucha</option>
                            <option value="Cogumelos orgânicos" >Cogumelos orgânicos</option>
                            <option value="Frutas congeladas" >Frutas congeladas</option>
                            <option value="Frutas orgânicas" >Frutas orgânicas</option>
                            <option value="Temperos desidratados orgânicos" >Temperos desidratados orgânicos</option>
                            <option value="Temperos orgânicos in natura" >Temperos orgânicos in natura</option>
                            <option value="Farinhas e cereais orgânicos" >Farinhas e cereais orgânicos</option>
                            <option value="Alimentos prontos congelados" >Alimentos prontos congelados</option>
                            <option value="Artesanato" >Artesanato</option>

                        </select>

                        <a onClick={()=>{insertNewItem()}} >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar item</h2>
                        </legend>

                        <select onChange={handleSelectItem} >

                            <option>Selecione o item</option>

                            {dataAdmin.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.title}</option>

                                )

                            })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='title' onChange={handleInputAdminChangeAlter} placeholder='Nome' value={dataAdmin[selectItem]?.title} />

                        <input name='desc' onChange={handleInputAdminChangeAlter} placeholder='Descrição' value={dataAdmin[selectItem]?.desc} />

                        <input name='price' onChange={handleInputAdminChangeAlter} placeholder='Preço' type='number' value={dataAdmin[selectItem]?.price} />

                        <input type='file' onChange={uploadImageAltered} accept="image/png, image/jpeg" placeholder='Imagem' />

                        <input name='amountInStock' onChange={handleInputAdminChangeAlter} placeholder='Quantidade em estoque' value={dataAdmin[selectItem]?.amountInStock} />

                        <select onChange={handleInputAdminChangeAlter} name='itemAvailability' >

                            <option value={0} >Disponibilidade</option>
                            <option value={true} >Disponível</option>
                            <option value={false} >Indisponível</option>

                        </select>

                        <select onChange={handleInputAdminChangeAlter} name='unity' value={dataAdmin[selectItem]?.unity}>

                            <option value='' > Selecione a unidade</option>
                            <option value='kg' >Quilograma</option>
                            <option value='Unidade' >Unidade</option>
                            <option value='maco' >Maço</option>

                        </select>

                        <a onClick={() => { setWasChanged(true); updateItem(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar item</h2>
                        </legend>

                        <select onChange={handleSelectItemToDelete} >

                            <option>Selecione o item</option>

                            {dataAdmin.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.title}</option>

                                )

                            })}

                        </select>

                        <a onClick={() => { deleteItem() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />
        </div>

    )

}

export default Admin