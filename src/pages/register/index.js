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

    const [loginData,setLoginData] = useState({

        email: '',
        password: ''

    })

    const [userIsLogged, setUserIsLogged] = useState(false);

    function makeLogin () {

        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
        .then((userCredential) => {
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        }); 
        
    }

    function handleInputLoginChange(event) {

        const {name, value} = event.target

        setLoginData ({

            ...loginData, [name]: value

        })
        
    }

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });

        
    }
    
    useEffect(() => {
        
        window.scrollTo(0, 0);

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    if (userIsLogged) {

        return (

            <div>
                Perfil da pessoa
                <button onClick={firebase.auth().signOut()} />
            </div>

        )
        
    }
    else {

        return (

            <div className="Register">

                <Header />

                <main id='mainRegister'> 

                    <div className='formsRegister'>

                        Login

                        <input name='email' onChange={handleInputLoginChange}/>
                        <input name='password' type='password' onChange={handleInputLoginChange}/>
                        {/* <input type='submit' onClick={makeLogin}></input> */}

                        <div className='buttonsFormRegister' >

                            <Link to='/Cadrastro'>Cadastre-se</Link>
                            <Link onClick={makeLogin}>Entrar</Link>

                        </div>

                    </div>

                </main>

                <Footer />

            </div>

        );

    }
}

export default Register;
