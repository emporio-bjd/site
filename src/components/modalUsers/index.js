import React from 'react'
import { useEffect, useState } from 'react'
import "./style.css";

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

function ModalUser(props) {

    const { displayProperty, modalDataUsers } = props;

    const [dataAccount, setDataAccount] = useState([]);
    const [wasChanged, setWasChanged] = useState(false)


    const [customerRegisterData, setCustomerRegisterData] = useState({

        name: '',
        phoneNumber: '',
        street: '',
        houseNumber: '',
        district: '',

    })

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('users').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataAccount(temp)
                }
                else {
                    console.log("No data available");
                }
            })

    }, [])

    function handleInputCustomerRegisterChange(event) {

        const { name, value } = event.target

        setCustomerRegisterData({

            ...customerRegisterData, [name]: value

        })

    }

    function updateCustomerRegister() {

        console.log(modalDataUsers.name)

            firebase.database().ref('users/' + modalDataUsers.id).update({

                name: modalDataUsers.name != '' ? modalDataUsers.name : 'teste'

            })
            .then(() => alert("Cadastro atualizado com sucesso!"))

            console.log(modalDataUsers.name)

    }

    return (

        <div style={{ display: displayProperty }} className='modalUser'>

            <main>

                <div className='titleModalUser' >

                    <h2>Insira as informações que deseja alterar abaixo</h2>

                    <div className="editUser">

                        <h4>Preencha apenas as informações que deseja alterar</h4>

                        <fieldset>

                            <legend>
                                <h2>Informações pessoais</h2>
                            </legend>

                            <input name='name' onChange={handleInputCustomerRegisterChange} placeholder='Nome completo' />

                            <input name='phoneNumber' onChange={handleInputCustomerRegisterChange} type='tel' placeholder='Telefone com DDD' />

                            <input name='email' onChange={handleInputCustomerRegisterChange} type='tel' placeholder='E-mail' />

                        </fieldset>

                        <fieldset>

                            <legend>
                                <h2>Endereço</h2>
                            </legend>

                            <input name='street' onChange={handleInputCustomerRegisterChange} placeholder='Nome da rua' />

                            <input name='houseNumber' onChange={handleInputCustomerRegisterChange} type='number' placeholder='N° da casa/apto' />

                            <input name='district' onChange={handleInputCustomerRegisterChange} placeholder='Bairro' />

                            <a onClick={() => { updateCustomerRegister() }}> Atualizar Informações</a>

                        </fieldset>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default ModalUser;