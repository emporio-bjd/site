import React, {useState, createRef} from 'react'
import './headerStyle.css'
import { Link } from "react-router-dom";
import logoAurea from '../../img/logoAurea2.png'

export default function Header (props) {

    const [isChecked,setIsChecked] = useState(false)

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

                <div className='logo' >

                    <Link to='/'> <img src={logoAurea} alt="LogoAurea" /> </Link>

                </div>

                {/* <div className='search' >

                    <input type="text" placeholder="Procurar.." />

                </div> */}

                <div className='menu' >

                    <ul>

                        <li> <Link to='/' > Início </Link> </li>
                        <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                        <li> <Link to='/produtos'> Produtos </Link> </li>
                        <li> <Link to='/Carrinho'> Carrinho <span>0</span> </Link> </li>
                        <li> <Link to='/entrar'> Login </Link> </li>

                    </ul>
                    
                </div>

                <div className="sandwich" >

                    <input type="checkbox" id="checkbox" onClick={ () => {

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

            <div className='menu-mobile' ref = {menuMobile} >

                <ul>

                    <li> <Link to='/' > Início </Link> </li>
                    <li> <Link to='/Quem-somos-nos'> Quem Somos </Link> </li>
                    <li> <Link to='/produtos'> Produtos </Link> </li>
                    <li> <Link to='/Carrinho'> Carrinho </Link> </li>
                    <li> <Link to='/entrar'> Login </Link> </li>

                </ul>

            </div>

        </div>

    )
}