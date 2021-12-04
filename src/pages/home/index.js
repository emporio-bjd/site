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
    const [displayText, setDisplayText] = useState('none');
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

                    <p style={{ display: displayText }}>"Nossa história começa em 2018 com uma chácara herdada na região metropolitana de Curitiba. Eu, Lucimara, e meu marido Norberto resolvemos reativar a chácara que era do meu pai e que estava abandonada desde 2011. Queríamos tornar a chácara rentável, já que meu marido havia sido demitido da empresa em que trabalhava por causa da crise da época. Nossa ideia era criar galinhas para comercializar ovos orgânicos.</p>

                    <p style={{ display: displayText }}>Enquanto arrumávamos o imóvel, eu fazia vários cursos sobre criação de galinhas e cultivo orgânico, e fui gostando cada vez mais desse mundo orgânico: alimentação mais saudável, menos agressão ao meio ambiente e valorização do pequeno produtor. Ao mesmo tempo, já que íamos toda semana para a chácara, começamos a comercializar morangos sem agrotóxicos de um vizinho. E a clientela foi aumentando..."</p>

                    <span style={{ display: displayText }}>Quer saber mais? <Link to="/Quem-somos-nos"> Clique aqui</Link></span>

                    <img className="arrow" style={{transform: {rotate: arrowRotation}}} src={arrow} alt="saiba mais" />

                </div>

            </section>

            <Footer />

        </div>

    );
}


export default Home;
