import React, { useState, createRef } from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoEmporio from '../../img/logoEmporio.png'
import './headerStyle.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

export default function Header(props) {

    const [isChecked, setIsChecked] = useState(false)
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataAccount, setDataAccount] = useState([]);

    const menuMobile = createRef()

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                setUserIsLogged(true)
        });


    }

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none'
        else
            menuMobile.current.style.display = 'flex'

    }

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        onAuthStateChanged();

    }, []);

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')

        firebase.database().ref('users/').get('/users')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    setDataUsers(temp)

                    temp.map((item) => {

                        if (item.email == userEmail) {
                            setDataAccount(item)
                        }

                    })

                } else
                    console.log("No data available");

            })

        firebase.database().ref('sellers/').get('/sellers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])

                    temp.map((item) => {

                        if (item.email == userEmail) {
                            setIsSeller(true)
                        }

                    })

                } else
                    console.log("No data available");

            })

    }, []);

    return (

        <div>

            <header>

                <div className='logo' >

                    <Link to='/'> <img src={logoEmporio} alt="logo Emporio Bom Jardim" /> </Link>

                </div>

                <div className='menu' >

                    {isSeller ?

                        <>
                            <ul>

                                <li> <Link to='/' > Início </Link> </li>
                                <li> <Link to='/Admin'> Admin </Link> </li>
                                <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                                <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                                <li> <Link to='/Entrar'> Login/Perfil </Link> </li>

                            </ul>

                        </>

                        :

                        <>
                            <ul>

                                <li> <Link to='/' > Início </Link> </li>
                                <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                                <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                                <li> <Link to='/Entrar'> Login/Perfil </Link> </li>

                            </ul>

                        </>

                    }

                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={() => {

                        setIsChecked(!isChecked);
                        showMenuMobile()

                    }} />

                    <label htmlFor="checkbox" >

                        <span></span>
                        <span></span>
                        <span></span>

                    </label>

                </div>

            </header>

            <div className='menu-mobile' ref={menuMobile} >

                <ul>

                    <li> <Link to='/' > Início </Link> </li>
                    <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                    <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                    <li> <Link to='/Entrar'> Login/Perfil </Link> </li>

                </ul>

            </div>

        </div>

    )
}