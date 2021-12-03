import  React from 'react'
import { Link } from "react-router-dom";
import logoEmporio from '../../img/visualChanges/logoBranca.png'
import './bigHeaderStyle.scss'

import 'firebase/auth'

export default function BigHeader(props) {


    return (

        <div>

            <header>

                <div className="bigheaderDiv">

                    <div className="logoDiv1">

                        <img src={logoEmporio} alt="" />
                        <article>

                            <h1>Alimentos orgânicos: mais saúde na sua mesa!</h1>
                            <h1>Produtos selecionados.</h1>

                        </article>

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