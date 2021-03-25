import { useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Button from '../../components/button'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'


import imgTeste from '../../img/imgTeste1.jpeg'
import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste5 from '../../img/imgTeste5.png'
import imgTeste6 from '../../img/imgTeste6.webp'
import React from 'react'

function Home() {

    useEffect(()=>{

        firebase.initializeApp(firebaseConfig);


    },[])

    useEffect(() => {

        window.scrollTo(0, 0)

    }, []);
    
    
    // vai vir da api
    const data = [

        {
            imageSrc: imgTeste4,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste2,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste6,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste5,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste4,
            title: 'Titulo',
            desc: "descricao"

        },
        {
            imageSrc: imgTeste4,
            title: 'Titulo',
            desc: "descricao"

        }

    ]

  return (

    <div className="App">

        <Header />

        <div className='containerHome' >

            <div className='productsHome'>

                <div className='search' >

                    <h1>Empório Bom Jardim</h1>

                    <input type="text" placeholder="Procurar.." />

                </div>

                <section id='sectionHome'>

                {
                    data.map(item => (

                        <div className='boxHome'>

                            <img src={item.imageSrc} alt='teste' />
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <Button />

                        </div>

                    ))
                }

                </section>

            </div>
        
            <div className='menuProductsHome' >
                <ul>
                    <li>nada</li>
                    <li>nada</li>
                    <li>nada</li>
                    <li>nada</li>
                    <li>nada</li>
                </ul>
            </div>
        </div>

        <Footer />

    </div>

  );
}

export default Home;
