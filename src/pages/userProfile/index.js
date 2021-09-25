import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import ReactCircleModal from 'react-circle-modal'

import { Link, useHistory } from "react-router-dom";

function UserProfile() {

    const [dataAccount, setDataAccount] = useState([]);
    // const [dataAccount, setDataAccount] = useState([]);
    const [displayDivAlterInfos, setDisplayDivAlterInfos] = useState("none");
    const [displayDivPedidos, setDisplayDivPedidos] = useState("none");
    const [seller, setSeller] = useState([]);
    const [isSeller, setIsSeller] = useState(false);
    const [requestData, setRequestData] = useState([{}]);
    const [registerData, setRegisterData] = useState({

        name: '',
        phoneNumber: '',
        street: '',
        city: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',
        city: '',

    })

    const [sellerRegisterData, setSellerRegisterData] = useState({

        name: '',
        phoneNumber: '',

    })

    let history = useHistory()

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email == userEmail)
                            setDataAccount(item)
                            setRegisterData(item)
                    })

                } else {
                    console.log("No data available");
                }
            })

            firebase.database().ref('sellers/').get('/sellers')
            .then(function (snapshot) {
    
                if (snapshot.exists()){
    
                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
    
                    temp.map((item)=>{ 
    
                        if(item.email == userEmail){
                            setSeller(item)
                            setIsSeller(true)
                            setSellerRegisterData(item)
                        }
    
                    })
    
                }else 
                    console.log("No data available");
    
            })

    }, []);

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        firebase.database().ref('requests/').get('/requests')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    var requestDataTemp = []

                    temp.map((item) => {

                        if (item.userEmail == userEmail)
                            requestDataTemp.push(item)

                    })
                    setRequestData(requestDataTemp)

                } else {
                    console.log("No data available");
                }
            })

    }, []);

    function signOut() {

        firebase.auth().signOut()
        localStorage.setItem('userEmail','')
        history.push('/')
        alert('Você desconectou da sua conta com sucesso!')

    }

    function handleDisplayDivAlterInfos() {

        if (displayDivAlterInfos == "none")
            setDisplayDivAlterInfos("flex")
        else
            setDisplayDivAlterInfos("none")

    }

    function handleDisplayDivPedidos() {

        if (displayDivPedidos == "none")
            setDisplayDivPedidos("flex")
        else
            setDisplayDivPedidos("none")

    }

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setRegisterData({

            ...registerData, [name]: value

        })

    }

    function handleInputSellerRegisterChange(event) {

        const { name, value } = event.target

        setSellerRegisterData({

            ...sellerRegisterData, [name]: value

        })

    }

    function updateRegister() {

            const newData = {

                name: registerData.name !== '' ? registerData.name : dataAccount.name,
                phoneNumber: registerData.phoneNumber !== '' ? registerData.phoneNumber : dataAccount.phoneNumber,
                personWhoIndicated: dataAccount.personWhoIndicated,
                whoIndicated: dataAccount.whoIndicated,
                street: registerData.street !== '' ? registerData.street : dataAccount.street,
                city: registerData.city !== '' ? registerData.city : dataAccount.city,
                houseNumber: registerData.houseNumber !== '' ? registerData.houseNumber : dataAccount.houseNumber,
                complement: registerData.complement !== '' ? registerData.complement : dataAccount.complement,
                district: registerData.district !== '' ? registerData.district : dataAccount.district,
                cepNumber: registerData.cepNumber !== '' ? registerData.cepNumber : dataAccount.cepNumber,
                city: registerData.city !== '' ? registerData.city : dataAccount.city,
                email: dataAccount.email,
                id: dataAccount.id

            }
            firebase.database()
            .ref('users/' + dataAccount.id)
            .update(newData)
            .then(() => alert("Dados atualizados com sucesso!"))
            window.location.reload()
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    function updateSellerRegister() {

            const newSellerData = {

                name: sellerRegisterData.name !== '' ? sellerRegisterData.name : seller.name,
                phoneNumber: sellerRegisterData.phoneNumber !== '' ? sellerRegisterData.phoneNumber : seller.phoneNumber,
                email: seller.email,
                id: seller.id

            }
            firebase.database()
            .ref('sellers/' + seller.id)
            .update(newSellerData)
            .then(() => alert("Dados atualizados com sucesso!"))
            window.location.reload()
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    if (isSeller) {
    
    return (

        <div className="clientProfile">
    
                <Header />
    
                <div className='dataClient'>
    
                    <ul>
                        <h2>Dados da conta</h2>
                        <li>
                            <p>Nome</p>
                            <p>{seller.name}</p>
                        </li>
                        <li>
                            <p>E-mail:</p>
                            <p>{seller.email}</p>
                        </li>
                        <li>
                            <p>Telefone:</p>
                            <p>{seller.phoneNumber}</p>
                        </li>
                    </ul>
    
                </div>
    
                {/* <section>
    
                    <h2 className="textAlterInfosProfile" >Acompanhe aqui seus pedidos:</h2>
    
                    <div className="divPedidos">
    
                        <div>
    
                            {requestData.map((request) => {
    
                                return <>
                                
                                    {request.listItem != undefined ?
    
                                        <>
    
                                            <h4> <span>id do pedido: {request.id}</span></h4>
    
                                            {request.listItem.map(item => {
    
                                                return (
                                                    <div className="acompanhaPedidos">
    
                                                        <div className="acomPedidosTitle">
    
                                                            <b>{item.title} - <span>{item.amount} ({item.unity})</span></b>
                                                            <h4><span>R$ {item.price}</span></h4>
    
                                                        </div>
                                                    </div>
    
                                                )
    
                                            })}
    
                                        </>
    
                                    : <p></p>}
                                </>
    
                            })}
    
                        </div>
    
                    </div>
    
                </section> */}
    
                <div className='alterInfosProfileDiv' >
                    <h4 className="textAlterInfosProfile" onClick={() => handleDisplayDivAlterInfos()} >Deseja alterar alguma informação? <span>clique aqui</span></h4>
    
                    <div style={{ display: displayDivAlterInfos }} className="divAlterInfos" >
    
                        <h2 className="arrowToDownUserProfile"> ⇣ </h2>
    
                        <p>Preencha apenas o que deseja atualizar</p>
    
                        <fieldset>
    
                            <legend>
                                <h2>Informações pessoais</h2>
                            </legend>
    
                            <input 
                                name='name' 
                                onChange={handleInputSellerRegisterChange} 
                                placeholder='Nome completo'
                                value={sellerRegisterData.name}
                            />
    
                            <input 
                                name='phoneNumber' 
                                type='tel' 
                                onChange={handleInputSellerRegisterChange} 
                                placeholder='Telefone com DDD' 
                                value={sellerRegisterData.phoneNumber}
                            />
    
                        </fieldset>
    
                        <a className="defaultButtonUserProfile" style={{ marginBottom: "5vh" }} onClick={() => updateSellerRegister()}>Atualizar Informações</a>
    
                    </div>
    
                </div>
    
                <div className="singnOutButton" >
                    <a onClick={() => signOut()} className="defaultButtonUserProfile" >SAIR</a>
                </div>
    
                <Footer />

            </div>

    )
    
    } else {

        return (

            <div className="clientProfile">
    
                <Header />
    
                <div className='dataClient'>
    
                    <ul>
                        <h2>Dados da conta</h2>
                        <li>
                            <p>Nome</p>
                            <p>{dataAccount.name}</p>
                        </li>
                        <li>
                            <p>E-mail:</p>
                            <p>{dataAccount.email}</p>
                        </li>
                        <li>
                            <p>Telefone:</p>
                            <p>{dataAccount.phoneNumber}</p>
                        </li>
                        <li>
                            <p>Endereço:</p>
                            <p>{dataAccount.city}: {dataAccount.street} - {dataAccount.houseNumber}, {dataAccount.district} ({dataAccount.complement})</p>
                        </li>
                    </ul>
    
                </div>
    
                <section>
    
                    <h2 className="textAlterInfosProfile" >Acompanhe aqui seus pedidos:</h2>
    
                    <div className="divPedidos">
    
                        <div>
    
                            {requestData.map((request) => {
    
                                return <>
                                
                                    {request.listItem != undefined ?
    
                                        <>
    
                                            <h4> <span>id do pedido: {request.id}</span></h4>
    
                                            {request.listItem.map(item => {
    
                                                return (
                                                    <div className="acompanhaPedidos">
    
                                                        <div className="acomPedidosTitle">
    
                                                            <b>{item.title} - <span>{item.amount} ({item.unity})</span></b>
                                                            <h4><span>R$ {item.price}</span></h4>
    
                                                        </div>
                                                    </div>
    
                                                )
    
                                            })}
    
                                        </>
    
                                    : <p></p>}
                                </>
    
                            })}
    
                        </div>
    
                    </div>
    
                </section>
    
                <div className='alterInfosProfileDiv' >
                    <h4 className="textAlterInfosProfile" onClick={() => handleDisplayDivAlterInfos()} >Deseja alterar alguma informação? <span>clique aqui</span></h4>
    
                    <div style={{ display: displayDivAlterInfos }} className="divAlterInfos" >
    
                        <h2 className="arrowToDownUserProfile"> ⇣ </h2>
    
                        <p>Preencha apenas o que deseja atualizar</p>
    
                        <fieldset>
    
                            <legend>
                                <h2>Informações pessoais</h2>
                            </legend>
    
                            <input 
                                name='name' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Nome completo'
                                value={registerData.name}
                            />
    
                            <input 
                                name='phoneNumber' 
                                type='tel' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Telefone com DDD' 
                                value={registerData.phoneNumber}
                            />
    
                        </fieldset>
    
                        <fieldset>
    
                            <legend>
                                <h2>Endereço</h2>
                            </legend>
    
                            <input 
                                name='city' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Cidade'
                                value={registerData.city}
                            />
    
                            <input 
                                name='street' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Nome da rua'
                                value={registerData.street}
                            />
    
                            <input 
                                name='houseNumber' 
                                type='number' 
                                onChange={handleInputRegisterChange} 
                                placeholder='N° da casa/apto'
                                value={registerData.houseNumber}
                            />
    
                            <input 
                                name='complement' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Complemento'
                                value={registerData.complement}
                            />
    
                            <input 
                                name='district' 
                                onChange={handleInputRegisterChange} 
                                placeholder='Bairro'
                                value={registerData.district}
                            />
    
                            <input 
                                name='cepNumber' 
                                onChange={handleInputRegisterChange} 
                                placeholder='CEP'
                                value={registerData.cepNumber}
                            />
    
                        </fieldset>
    
                        <a className="defaultButtonUserProfile" style={{ marginBottom: "5vh" }} onClick={() => updateRegister()}>Atualizar Informações</a>
    
                    </div>
    
                </div>
    
                <div className="singnOutButton" >
                    <a onClick={() => signOut()} className="defaultButtonUserProfile" >SAIR</a>
                </div>
    
                <ReactCircleModal
                    backgroundColor="#434f38"
                    toogleComponent={onClick => (<button className="finishButton" onClick={onClick}> Gostou do seu pedido? Responda esta pesquisa de satisfação! </button>
                    )}
                    offsetX={0}
                    offsetY={0}
                >
                    {(onClick) => (
                        <div className="popUpSatisf" style={{ backgroundColor: '#fff', padding: '1em' }}>
                            <p>
                                <div className='pesquisaSatisf'>
    
                                    <div className='titlePesquisa' >
                                        <h1>Gostou do seu pedido?</h1>
                                    </div>
    
                                    <fieldset>
    
                                        <input placeholder='Escreva sua avaliação!' />
    
                                    </fieldset>
    
                                    <div className='buttonsFormSignIn' >
    
                                        <button className="finishButton" >Enviar</button>
    
                                    </div>
    
                                </div>
                            </p>
                            <button className="finishButton" onClick={onClick}>
                                Fechar pesquisa
                            </button>
                        </div>
                    )}
                </ReactCircleModal>
    
                <Footer />
            </div>
    
        )

    }
}

export default UserProfile;
