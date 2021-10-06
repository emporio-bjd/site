import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

import { Link, Redirect } from "react-router-dom";

function ForgotPassword() {

    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)

    }, []);

    function handleUserEmail (event) {

        setUserEmail(event.target.value)
        console.log(userEmail)

    }

    function sendEmailPasswordReset() {

        firebase.auth().languageCode = 'pt';

        firebase.auth().sendPasswordResetEmail(userEmail)
        .then(() => {
            console.log('envieeeeeeei')
        })
        .catch((error) => {

            var errorCode = error.code
            var errorMessage = error.message

        });

    } 

    return (

        <div>

            <h1>Insira aqui seu e-mail</h1>
    
            <input onChange={handleUserEmail} type="text" placeholder="E-mail"/>

            <button onClick={() => sendEmailPasswordReset()}>Recuperar senha</button>

        </div>


    )

}

export default ForgotPassword;