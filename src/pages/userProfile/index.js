import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, useHistory } from "react-router-dom";

function UserProfile() {

    const [dataAccount, setDataAccount] = useState([]);
    const [displayDivAlterInfos, setDisplayDivAlterInfos] = useState("none");
    const [registerData,setRegisterData] = useState({

        name: '',
        phoneNumber: '',
        street: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',

    })

    let history = useHistory()
    
    useEffect(() => {
        
        window.scrollTo(0, 0);

        const id = localStorage.getItem('id')
        const userEmail = localStorage.getItem('userEmail')

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

        

        firebase.database().ref('users/').get('/users')
        .then(function (snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.map((item)=>{ 

                    if(item.email == userEmail)
                        setDataAccount(item)

                })

            }else {
                console.log("No data available");
            }
        })

    }, []);

    function signOut() {

        firebase.auth().signOut()
        history.goBack()
        
    }

    function handleDisplayDivAlterInfos() {

        if(displayDivAlterInfos == "none")
            setDisplayDivAlterInfos("flex")
        else
            setDisplayDivAlterInfos("none")
        
    }

    function handleInputRegisterChange(event) {

        const {name, value} = event.target

        setRegisterData ({

            ...registerData, [name]: value

        })
        
    }

    function updateRegister () {

        firebase.database().ref('users/' + dataAccount.id).update({

            name: registerData.name != '' ? registerData.name : dataAccount.name,
            phoneNumber: registerData.phoneNumber != '' ? registerData.phoneNumber : dataAccount.phoneNumber,
            personWhoIndicated: dataAccount.personWhoIndicated,
            whoIndicated: dataAccount.whoIndicated,
            street: registerData.street != '' ? registerData.street : dataAccount.street,
            houseNumber: registerData.houseNumber != '' ? registerData.houseNumber : dataAccount.houseNumber,
            complement: registerData.complement != '' ? registerData.complement : dataAccount.complement,
            district: registerData.district != '' ? registerData.district : dataAccount.district,
            cepNumber: registerData.cepNumber != '' ? registerData.cepNumber : dataAccount.cepNumber,
            email: dataAccount.email,
            id: dataAccount.id

        })
        .then(()=>alert("Cadastro atualizado com sucesso!"))
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }); 
        
    }

    return (

        <div className="clientProfile">

            <Header />

            <div className='dataClient'>

                <h4>Meus dados</h4>

                <ul>
                    <h5>Dados da conta</h5>
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
                        <p>{dataAccount.street}, {dataAccount.district} - {dataAccount.houseNumber}</p>
                    </li>
                </ul>

                <div className="singnOutButton" >
                    <a onClick={()=>signOut()} className="defaultButtonUserProfile" >SAIR</a>
                </div>
                
            </div>

            <h4 className="textAlterInfosProfile" onClick={()=>handleDisplayDivAlterInfos()} >Deseja alterar alguma informação? <span>clique aqui</span></h4>


            <div style={{display: displayDivAlterInfos}} className="divAlterInfos" >
                
                <h2 className="arrowToDownUserProfile"> ⇣ </h2>

                <p>Preencha apenas o que deseja atualizar</p>

                <fieldset>

                    <legend>
                        <h2>Informações pessoais</h2>
                    </legend>

                    <input name='name' onChange={handleInputRegisterChange} placeholder='Nome completo' />

                    <input name='phoneNumber' type='tel' onChange={handleInputRegisterChange} placeholder='Telefone com DDD' />

                </fieldset>

                <fieldset>

                    <legend>
                        <h2>Endereço</h2>
                    </legend>

                    <input name='street' onChange={handleInputRegisterChange} placeholder='Nome da rua' />

                    <input name='houseNumber' type='number' onChange={handleInputRegisterChange} placeholder='N° da casa/apto' />

                    <input name='complement' onChange={handleInputRegisterChange} placeholder='Complemento' />

                    <input name='district' onChange={handleInputRegisterChange} placeholder='Bairro' />

                    <input name='cepNumber' onChange={handleInputRegisterChange} placeholder='CEP' />

                </fieldset>

                <a className="defaultButtonUserProfile" style={{marginBottom: "5vh"}} onClick={()=>updateRegister()}>Atualizar Informações</a>

            </div>

            <Footer />
        </div>

    )

}

export default UserProfile;