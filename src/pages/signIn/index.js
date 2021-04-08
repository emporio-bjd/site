import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link } from "react-router-dom";

function Register() {

    const [registerData,setRegisterData] = useState({

        email: '',
        password: '',
        street: '',
        houseNumber: '',

    })

    function makeRegister () {

        firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password)
        .then((user) => {
            console.log('logado')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }); 
        
    }

    function handleInputRegisterChange(event) {

        const {name, value} = event.target

        setRegisterData ({

            ...registerData, [name]: value

        })
        
    }
    
    useEffect(() => {
        
        window.scrollTo(0, 0);
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);

    return (

        <div className="SigIn">

            <Header />

            <main id='mainSignIn'> 

                <div className='formsSignIn'>

                    <h1>Cadrastar-se no Empório Bom Jardim</h1>

                    <fieldset>

                        <legend>
                            <h2>E-mail e senha</h2>
                        </legend>

                        <input name='email' onChange={handleInputRegisterChange} placeholder='E-mail' />

                        <input name='password' onChange={handleInputRegisterChange} placeholder='Senha' />

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Endereço</h2>
                        </legend>

                        <input name='street' onChange={handleInputRegisterChange} placeholder='Nome da rua e bairro' />

                        <input name='houseNumber' onChange={handleInputRegisterChange} placeholder='N° da casa/apto' />

                    </fieldset>

                    <div className='buttonsFormSignIn' >

                        <Link to='/Cadrastro'>Cadastrar</Link>

                    </div>

                </div>

            </main>

            <Footer />

        </div>

    );

}

export default Register;
