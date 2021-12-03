import React from 'react'
import { Link } from "react-router-dom";

import './footerStyle.scss'

import instagramIcon from '../../img/instagramIcon.png'
import facebookIcon from '../../img/facebookIcon.png'
import logoAurea from '../../img/logoAurea2.png'
import logoEmporio from '../../img/visualChanges/logoBranca.png'

export default function Footer (props) {

    return (

        <footer>

            <div className='address' >

                <img src={logoEmporio} alt='logoEmporio' />
                <div className="collumnItens">
                    <ul>
                        <li> <Link to='/' > Início </Link> </li>
                        <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                        <li> <Link to='/contato'> Contato </Link> </li>
                    </ul>
                    
                    <p>WhatsApp: (41) 99841-6657</p>

                    <div className='copyright' >
                        
                        <p>Desenvolvido por:</p>

                        <a href='https://aureaej.com/' ><img src={logoAurea} alt='logoAurea' /></a>

                    </div>


                </div>
            </div>

            <div className='socialMedias' >

                <a href='https://www.instagram.com/emporio_bomjardim/'  > <p>@emporio_bomjardim</p> <img src={instagramIcon} alt='logoInstagram' /> </a>
                <a href='https://www.facebook.com/bomjardimemporio'  > <p>/bomjardimemporio</p> <img src={facebookIcon} alt='logoFacebook' /> </a>

            </div>

        </footer>

    )
}