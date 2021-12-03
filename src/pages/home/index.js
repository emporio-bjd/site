import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import BigHeader from '../../components/bigheader'
import Footer from '../../components/footer'
import './style.scss'

import arrow from '../../img/arrow.svg'
import logo from '../../img/logoEmporio2.png'

import 'firebase/auth'
import 'firebase/database'

function Home() {

    const [isOpened, setIsOpened] = useState(false);
    const [displayText, setDisplayText] = useState(false);
    const [arrowRotation, setArrowRotation] = useState('0deg');

    function openCard() {

        if (isOpened) {

            setDisplayText('none')
            setIsOpened(false)
            setArrowRotation('180deg')

        } else {

            setDisplayText('flex')
            setIsOpened(true)
            setArrowRotation('0deg')

        }

    }

    return (

        <div className="App" >

            <BigHeader />

            <section id="ShopCall">

                <h1>Produtos orgânicos e selecionados <br />para mais saúde na sua vida e de sua família!</h1>
                <p>Acesse nossa loja e confira todas as nossas variedades de produtos disponíveis para seu gosto</p>

                <div className="buttonsWrapper">

                    <button className="btnRedirect">Ir para loja</button>
                    <Link to="/Quem-somos-nos" className="btnAboutUs" >Saiba mais</Link>

                </div>

            </section>

            <section id="CardWrapperHome">

                <div onClick={() => openCard()} className="cardHome">

                    <h2>Conheça nossa história</h2>

                    <img className="logo" style={{ display: displayText }} src={logo} alt="" />

                    <p style={{ display: displayText }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, ex nam. Nisi corporis ullam similique labore, quaerat perspiciatis dignissimos aut, doloribus sunt voluptatum, dolorem natus! Ad, optio voluptatem maiores officiis sunt repudiandae illum, delectus accusantium facilis odit assumenda ipsum vitae! Voluptatum aut sapiente saepe repudiandae provident eum reiciendis recusandae! Non!</p>

                    <img className="arrow" style={{transform: {rotate: arrowRotation}}} src={arrow} alt="saiba mais" />

                </div>

            </section>

            <Footer />

        </div>

    );
}


export default Home;
