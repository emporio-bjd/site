import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

function Register() {

    useEffect(()=>{

        firebase.initializeApp(firebaseConfig);  

    },[])

    const [loginData,setLoginData] = useState({

        email: '',
        password: ''

    })

    function makeRegister () {

        firebase.auth().createUserWithEmailAndPassword('test@gmail.com', '12345678')
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
        
    }

    function handleInputLoginChange(event) {

        const {name, value} = event.target

        setLoginData ({

            ...loginData, [name]: value

        })
        console.log(loginData)
        
    }

    useEffect(() => {

        window.scrollTo(0, 0)

    }, []);
    

  return (

    <div className="Register">

        <Header />

        <main id='mainRegister'> 

            <div className='formsRegister'>

                <input name='email' onChange={handleInputLoginChange}/>
                <input name='password' onChange={handleInputLoginChange}/>
                <input type='submit'></input>

            </div>

        </main>

        <Footer />

    </div>

  );
}

export default Register;
