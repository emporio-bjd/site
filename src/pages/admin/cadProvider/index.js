import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

/*
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'


function Provider() {

    function handleInputAdminChange(event) {

        const {name, value} = event.target

        setNewDataAdmin ({

            ...newDataAdmin, [name]: value

        })
        
    }

    function handleInputAdminChangeAlter(event) {

        const {name, value} = event.target

        setDataAlterItem ({

            ...dataAlterItem, [name]: value

        })
        
    }

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

            firebase.database().ref('items').get('/items')
            .then(function(snapshot) {

                if (snapshot.exists()) 
                    setDataAdmin(snapshot.val());
                else {
                    console.log("No data available");
                }
            })

    },[])

    function insertNewItem() {

        if (newDataAdmin.imageSrc != '' && newDataAdmin.title != '') {

            if ( newDataAdmin.desc != '' && newDataAdmin.price != 0 ) {

                firebase.database().ref('items/' + 8).set({

                    imageSrc: newDataAdmin.imageSrc,
                    title: newDataAdmin.title,
                    desc: newDataAdmin.desc,
                    price: newDataAdmin.price
                })
                
            } 
            
        } 
        
    }

    function updateItem() {

        if (wasChanged) {

            console.log(selectItem)
            
            firebase.database().ref('items/' + selectItem).update({

                imageSrc: dataAlterItem.imageSrc != '' ? dataAlterItem.imageSrc : null,
                title: dataAlterItem.title != '' ? dataAlterItem.title : null,
                desc: dataAlterItem.desc != '' ? dataAlterItem.desc : null,
                price: dataAlterItem.price != 0 ? dataAlterItem.price : null
            })

        }
        
    }

    function deleteItem() {

        firebase.database().ref('items/' + selectItemToDelete).remove()
        
    }

    */

    function Provider() {

        const [selectedOption, setSelectedOption] = useState('')

        function handleSelect(event) {

            const {name, value} = event.target
    
            setSelectedOption(value)
            
        }

    return (

        <div className='Provider'>

            <Header />

            <main id='mainProvider' >

                <div className='titleProvider' >
                    <h1>Bem-vindo ao cadastro de fornecedores da Empório Bom Jardim 💛</h1>
                </div>

                <div className='titleProvider' >
                    <h3>O que deseja fazer?</h3>
                </div>

                <div className='providerOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo fornecedor</h2>
                        </legend>

                        <input name='companyName' onChange placeholder='Nome da empresa' />

                        <input name='contactName' onChange placeholder='Nome de contato' />

                        <input name='email' onChange placeholder='E-mail' />
                        
                        <input name='phoneNumber' onChange placeholder='Telefone de contato com DDD' />

                        <legend>
                            <h2>Listagem de pedidos</h2>
                        </legend>

                        <h6>Preencha os dados abaixo</h6>

                        <input name='productName' onChange placeholder='Produto' />

                        <input name='qntd' onChange placeholder='Quantidade' />

                        <select onChange={handleSelect} >
                            <option value='0' >Unidade de medida</option>
                            <option value='1' >Quilograma</option>
                            <option value='2' >Unidade</option>
                        </select>

                        <input name='imageSrc' onChange placeholder='URL da imagem' />

                        <input name='buyPrice' onChange placeholder='Preço de compra' />

                        <input name='sellPrice' onChange placeholder='Preço de venda' />

                        <a onClick >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar item</h2>
                        </legend>

                        <select onChange >

                            <option>Selecione o item</option>

                           

                        </select>

                        <a onClick >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />
        </div>

    )
    
}

export default Provider