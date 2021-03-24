import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

function Register() {


    const [loginData,setLoginData] = useState({

        email: '',
        password: ''

    })

    const [userIsLogged, setUserIsLogged] = useState();

    function makeRegister () {

        firebase.auth().createUserWithEmailAndPassword(loginData.email, loginData.password)
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
        
    }

    // function onAuthStateChanged(user) {

    //     setUserIsLogged(user);
    //     console.log(userIsLogged)
        
    // }

    // useEffect(()=>{

        
    // },[])
    
    useEffect(() => {
        
        window.scrollTo(0, 0);
        
        firebase.initializeApp(firebaseConfig);  
        setUserIsLogged(firebase.auth().onAuthStateChanged());

    }, []);


    

  return (

    <div className="Register">

        <Header />

        <main id='mainRegister'> 

            <div className='formsRegister'>

                <input name='email' onChange={handleInputLoginChange}/>
                <input name='password' onChange={handleInputLoginChange}/>
                <input type='submit' onClick={makeRegister}></input>

            </div>

        </main>

        <Footer />

    </div>

  );
}

export default Register;
