import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Redirect } from "react-router-dom";

import Header from '../../components/header'
import Footer from '../../components/footer'

import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import InputMask from 'react-input-mask';

import logoEmporio2 from '../../img/logoEmporio2.png'

function Register() {

    const [registerData, setRegisterData] = useState({

        name: '',
        phoneNumber: '',
        birthDate: '',
        personWhoIndicated: '',
        city: '',
        street: '',
        houseNumber: '',
        complement: '',
        district: '',
        cepNumber: '',
        email: '',
        password: '',
        giveData: '',

    })

    const [selectedOption, setSelectedOption] = useState('')
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [registerDone, setRegisterDone] = useState(false);
    const [dataSellers, setDataSellers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [displayInputWhoIndicated, setDisplayInputWhoIndicated] = useState('none');
    const [displaySelectWhoIndicated, setDisplaySelectWhoIndicated] = useState('none');

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('sellers/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))

                setDataSellers(temp)
            }

            else {

                console.log("No data available");

            }

        });

    }, [])

    function makeRegister() {

        firebase.auth()
            .createUserWithEmailAndPassword(registerData.email, registerData.password)
            .then((user) => {

                const id = firebase.database().ref().child('posts').push().key

                const data = {

                    name: registerData.name,
                    phoneNumber: registerData.phoneNumber,
                    birthDate: registerData.birthDate,
                    personWhoIndicated: registerData.personWhoIndicated,
                    whoIndicated: selectedOption,
                    city: registerData.city,
                    street: registerData.street,
                    houseNumber: registerData.houseNumber,
                    complement: registerData.complement,
                    district: registerData.district,
                    cepNumber: registerData.cepNumber,
                    email: registerData.email,
                    giveData: checked,
                    id: id

                }

                firebase.database().ref('users/' + id).set(data)

                localStorage.setItem('id', id)

                alert('Cadastro realizado com sucesso!')

                setRegisterDone(true)

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

    }

    function handleInputRegisterChange(event) {

        const { name, value } = event.target

        setRegisterData({

            ...registerData, [name]: value

        })

    }

    function handleSelect(event) {

        const { name, value } = event.target

        setSelectedOption(value)

        if (value == 1 || value == 6) {

            setDisplayInputWhoIndicated('block')
            setDisplaySelectWhoIndicated('none')

        }

        else if (value == 2) {

            setDisplaySelectWhoIndicated('block')
            setDisplayInputWhoIndicated('none')


        }

        else {

            setDisplayInputWhoIndicated('none')
            setDisplaySelectWhoIndicated('none')

        }

    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });

    }

    useEffect(() => {

        window.scrollTo(0, 0);
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    function searchCepData(event) {

        const inputValue = event.target.value

        const validCep = inputValue?.replace(/[^0-9]/g, '')

        if (validCep.length !== 8) {

            window.alert('CEP inválido')

        } else {

            fetch(`https://viacep.com.br/ws/${validCep}/json/`)
                .then((item) => item.json())
                .then((data) => {

                    if (!("erro" in data)) {

                        document.getElementById('street').value = (data.logradouro);
                        document.getElementById('district').value = (data.bairro)

                        // setRegisterData({
                        //     ...registerData, ['district']: data.bairro
                        // })
                        // setRegisterData({
                        //     ...registerData, ['street']: data.logradouro
                        // })


                    } else {

                        window.alert('CEP inválido')
                        cleanForm()

                    }


                })

        }
    }

    function cleanForm() {

        document.getElementById('street').value = ('');
        document.getElementById('district').value = ('');

    }

    function makeVerifications() {

        var counter = 0

        registerData.name != '' ? counter = counter + 1 : counter = counter
        registerData.cepNumber != '' ? counter++ : counter = counter
        registerData.complement != '' ? counter++ : counter = counter
        registerData.district != '' ? counter++ : counter = counter
        registerData.email != '' ? counter++ : counter = counter
        registerData.houseNumber != '' ? counter++ : counter = counter
        registerData.password != '' ? counter++ : counter = counter
        registerData.phoneNumber != '' ? counter++ : counter = counter
        registerData.street != '' ? counter++ : counter = counter
        registerData.city != '' ? counter++ : counter = counter

        if (counter == 10)
            makeRegister()
        else
            alert('Você precisa preencher todos os campos que possuem *')

    }

    if (userIsLogged) {

        return (

            <Redirect to='/Perfil' />

        )

    } else {

        if (registerDone) {

            return (

                <Redirect to='/Entrar' />

            )

        } else {

            return (

                <div className="SigIn">

                    <Header />

                    <main id='mainSignIn'>

                        <div className='formsSignIn'>

                            <img src={logoEmporio2} alt="Logo Emporio" />

                            <div className='titleSignIn' >
                                <h1>Cadastrar-se</h1>
                            </div>

                            <div className='haveAccount' >
                                <h5>Já tem uma conta? <Link to='/Entrar' >entrar</Link></h5>
                            </div>

                            <fieldset>

                                <legend>
                                    <h2>Informações pessoais <span style={{ color: '#662210', fontSize: '14px' }} >( * campos obrigatórios )</span></h2>
                                </legend>

                                <input name='name' onChange={handleInputRegisterChange} placeholder='Nome completo *' />

                                <InputMask name='phoneNumber' type='tel' mask="(99) 99999-9999" maskChar=" " onChange={handleInputRegisterChange} placeholder='Telefone com DDD *' />

                                <input name='birthDate' type='date' onChange={handleInputRegisterChange} placeholder='Data de nascimento' />

                                <select onChange={handleSelect} >
                                    <option value='0' >Como ficou sabendo sobre nós?</option>
                                    <option value='1' >Indicação</option>
                                    <option value='2' >Recebi contato da empresa</option>
                                    <option value='3' >Facebook</option>
                                    <option value='4' >Instagram</option>
                                    <option value='5' >Pesquisa no Google</option>
                                    <option value='6' >Outros</option>
                                </select>

                                {/* fazer depois esse campo só aparecer se a pessoa selecionar o item 2 do select */}
                                <input name='personWhoIndicated' style={{ display: displayInputWhoIndicated }} onChange={handleInputRegisterChange} placeholder='Quem indicou?' />

                                <select name='personWhoIndicated' style={{ display: displaySelectWhoIndicated }} onChange={handleInputRegisterChange} placeholder='Quem indicou?'>

                                    <option selected disabled>Selecione o vendedor que indicou</option>

                                    {dataSellers.map((item, index) => {

                                        return (

                                            <option value={item.name} key={index}>{item.name}</option>

                                        )

                                    })}

                                </select>

                            </fieldset>

                            <fieldset>

                                <legend>
                                    <h2>Endereço</h2>
                                </legend>

                                <input id='cep' name='cepNumber' type='text' onChange={handleInputRegisterChange} placeholder='CEP *' />
                                {/* onBlur={searchCepData}  */}

                                <input id='city' name='city' type='text' onChange={handleInputRegisterChange} placeholder='Município *' />

                                <input id='street' name='street' type='text' onChange={handleInputRegisterChange} placeholder='Nome da rua *' />

                                <input name='houseNumber' type='number' onChange={handleInputRegisterChange} placeholder='Número *' />

                                <input id='district' name='district' type='text' onChange={handleInputRegisterChange} placeholder='Bairro *' />

                                <input name='complement' onChange={handleInputRegisterChange} placeholder='Complemento *' />

                            </fieldset>

                            <fieldset>

                                <legend>
                                    <h2>E-mail e senha</h2>
                                </legend>

                                <input name='email' onChange={handleInputRegisterChange} placeholder='E-mail *' />

                                <input name='password' type="password" onChange={handleInputRegisterChange} placeholder='Senha para o site *' />

                            </fieldset>

                            <div className="allowDataUse">

                                <label id="giveDataText">
                                    <input
                                        type="checkbox"
                                        name="giveData"
                                        id="giveData"
                                        defaultChecked={checked}
                                        onChange={() => setChecked(!checked)}
                                    />
                                    Aceito receber informações sobre a Empório por Whatsapp ou e-mail
                                </label>

                            </div>

                            <div className='buttonsFormSignIn' >

                                <Link onClick={() => { makeVerifications() }}>Cadastrar</Link>

                            </div>

                        </div>

                    </main>

                    <Footer />

                </div>

            );

        }

    }
}

export default Register;
