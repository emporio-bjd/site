import React, { useState, createRef } from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoEmporio from '../../img/visualChanges/logoBranca.png'
import HeaderTop from '../../img/visualChanges/Barra_up.png'
import HeaderSwirls from '../../img/visualChanges/Barra_swirls up.png'
import './headerStyle.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'

export default function Header(props) {

    const [isChecked, setIsChecked] = useState(false)
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const menuMobile = createRef()

    function showMenuMobile() {

        if (isChecked)
            menuMobile.current.style.display = 'none'
        else
            menuMobile.current.style.display = 'flex'

    }

    return (

        <div>

            <header>

                <div className="headerDiv">

                    <div className="logoDiv">

                        <img src={logoEmporio} alt="" />

                    </div>

                    <div className="menu">

                        <ul>

                            <li> <Link to='/' > Início </Link> </li>
                            <li> <Link to='/contato'> Contato </Link> </li>
                            <li> <Link to='/Quem-somos-nos'> Sobre nós </Link> </li>

                        </ul>

                    </div>


                </div>

            </header>

        </div>

    )
}