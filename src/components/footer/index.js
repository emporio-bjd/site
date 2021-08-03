import React from 'react'
import { Link } from "react-router-dom";

import './footerStyle.css'

import instagramIcon from '../../img/instagramIcon.png'
import facebookIcon from '../../img/facebookIcon.png'
import linkedinIcon from '../../img/linkedinIcon.png'
import logoAurea from '../../img/logoAurea.png'
import logoEmporio from '../../img/logoEmporio3.png'

export default function Footer (props) {

    return (

        <footer>

            <div className='address' >

                <img src={logoEmporio} alt='logoEmporio' />

                <ul>
                    <li> <Link to='/' > Início </Link> </li>
                    <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                    <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                    <li> <Link to='/Entrar'> Login/Perfil </Link> </li>
                </ul>

                <p>Whatsapp: (41) 99841-6657</p>

                <div className='socialMedias' >

                <a href='https://www.instagram.com/emporio_bomjardim/'  > <img src={instagramIcon} alt='logoInstagram' /> </a>
                <a href='https://www.facebook.com/bomjardimemporio'  > <img src={facebookIcon} alt='logoFacebook' /> </a>

            </div>
                
            </div>

            <div className='copyright' >
                
                <p>Desenvolvido por :</p>

                <a href='https://aureaej.com/' ><img src={logoAurea} alt='logoAurea' /></a>

            </div>

        </footer>

    )
}