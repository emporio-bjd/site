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

        name: '',
        phoneNumber: '',
        birthDate: '',
        personWhoIndicated: '',
        street: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',
        email: '',
        password: '',

    })

    const [selectedOption, setSelectedOption] = useState('')

    function makeRegister () {

        // SO PODE FAZER O REGISTRO SE OS DOIS DEREM OK (AINDA TEM QUE FAZER ). fé kkkkkkkkk

        firebase.auth().createUserWithEmailAndPassword(registerData.email, registerData.password)
        .then((user) => {
            console.log('logado')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }); 

        const id = firebase.database().ref().child('posts').push().key

        firebase.database().ref('users/' + id).set({

            name: registerData.name,
            phoneNumber: registerData.phoneNumber,
            birthDate: registerData.birthDate,
            personWhoIndicated: registerData.personWhoIndicated,
            whoIndicated: selectedOption,
            street: registerData.street,
            houseNumber: registerData.houseNumber,
            complement: registerData.complement,
            district: registerData.district,
            cepNumber: registerData.cepNumber,
            email: registerData.email,
            email: registerData.email

        })
        
    }

    function handleInputRegisterChange(event) {

        const {name, value} = event.target

        setRegisterData ({

            ...registerData, [name]: value

        })
        
    }
    function handleSelect(event) {

        const {name, value} = event.target

        setSelectedOption(value)
        
    }
    
    useEffect(() => {
        
        // window.scrollTo(0, 0);
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);


    // FALTA FAZER A VALIDAÇÃO. TIPO: VERIFICAR SE OS CAMPOS OBRIGATÓRIOS FORAM PREENCHIDOS E ETC

    return (

        <div className="SigIn">

            <Header />

            <main id='mainSignIn'> 

                <div className='formsSignIn'>

                    <div className='titleSignIn' >
                        <h1>Cadrastar-se no Empório Bom Jardim</h1>
                    </div>

                    <div className='haveAccount' >
                        <h5>Já tem uma conta? <Link to='/entrar' >entrar</Link></h5>
                    </div>

                    <fieldset>

                        <legend>
                            <h2>Informações pessoais</h2>
                        </legend>

                        <input name='name' onChange={handleInputRegisterChange} placeholder='Nome completo' />

                        <input name='phoneNumber' type='number' onChange={handleInputRegisterChange} placeholder='Telefone com DDD' />

                        <input name='birthDate' type='date' onChange={handleInputRegisterChange} placeholder='Data de nascimento (n obgt)' />

                        <select onChange={handleSelect} >
                            <option value='0' >Como ficou sabendo de nós?</option>
                            <option value='1' >indicação (digite o nome abaixo)</option>
                            <option value='2' >recebi contato da empresa: abrir campo lista com nome dos vendedores</option>
                            <option value='3' >Facebook</option>
                            <option value='4' >Instagram</option>
                            <option value='5' >Pesquisa no Google</option>
                        </select>

                        {/* fazer depois esse campo só aparecer se a pessoa selecionar o item 2 do select */}
                        <input name='personWhoIndicated' onChange={handleInputRegisterChange} placeholder='Quem indicou?' />

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

                    <fieldset>

                        <legend>
                            <h2>E-mail e senha</h2>
                        </legend>

                        <input name='email' onChange={handleInputRegisterChange} placeholder='E-mail' />

                        <input name='password' onChange={handleInputRegisterChange} placeholder='Senha' />

                    </fieldset>

                    <div className='buttonsFormSignIn' >

                        <Link onClick={()=> {makeRegister()}}>Cadastrar</Link>

                    </div>

                </div>

            </main>

            <Footer />

        </div>

    );

}

export default Register;
