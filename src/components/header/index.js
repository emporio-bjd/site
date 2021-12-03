import React from 'react'
import { Link } from "react-router-dom";
import logoEmporio from '../../img/visualChanges/logoBranca.png'
import './headerStyle.scss'

import 'firebase/auth'

export default function Header(props) {

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