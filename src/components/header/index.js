import React, { useState, createRef } from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoEmporio from '../../img/visualChanges/logoBranca.png'
import HeaderTop from '../../img/visualChanges/Barra_up.png'
import HeaderSwirls from '../../img/visualChanges/Barra_swirls up.png'
import './headerStyle.css'

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

               <div className="headerWrapper">

                    <div className="topHeader">

                        <img src={HeaderTop} alt="" />

                        <div className="logoWrapper">

                            <img src={logoEmporio} alt="" />

                        </div>

                    </div>

                    <img className="bottomHeader" src={HeaderSwirls} alt="" />

               </div>

                {/* <div className='menu' >

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

                </div> */}

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