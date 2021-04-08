import { useEffect } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Button from '../../components/button'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from '../../FIREBASECONFIG.js'


import shoppingCart from '../../img/shoppingCart.png'
import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste5 from '../../img/imgTeste5.png'
import imgTeste6 from '../../img/imgTeste6.webp'
import React from 'react'

function Home() {

    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

    },[])

    useEffect(() => {

        window.scrollTo(0, 0)

    }, []);
    
    
    // vai vir da api
    const data = [

        {
            imageSrc: imgTeste4,
            title: 'Cesta de frutas',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 43.35

        },
        {
            imageSrc: imgTeste2,
            title: 'Maçãs',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
            price: 32.50

        },
        {
            imageSrc: imgTeste5,
            title: 'Abacate',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.",
            price: 215.50

        },
        {
            imageSrc: imgTeste5,
            title: 'Abacate',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 235.50

        },
        {
            imageSrc: imgTeste2,
            title: 'Maçãs',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            price: 10.00

        },
        {
            imageSrc: imgTeste6,
            title: 'Uva',
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.",
            price: 5.42

        }

    ]

  return (

    <div className="App">

        <Header />

        <div className='search' >

            <h1>Empório Bom Jardim</h1>

            <input type="text" placeholder="Procurar.." />

        </div>

        <div className='containerHome' >

            <div className='productsHome'>

                <section id='sectionHome'>

                {
                    data.map(item => (

                        <div className='boxHome'>

                            <img src={item.imageSrc} alt='teste' />
                            <h3>{item.title}</h3>

                            <div className='lineBoxProduct'>

                                <h4>R$ {item.price}</h4>
                                <img src={shoppingCart}/>

                            </div>

                            <p>{item.desc}</p>

                            {/* <Button /> */}

                        </div>

                    ))
                }

                </section>

            </div>

            <div className="areaLateral">
        
                <div className='menuProductsHome' >

                    <div className='filterProducts' >

                        <h4>Preço</h4>

                        <div className='filtersInputs'>
                            <input placeholder='min' />
                                -    
                            <input placeholder='max' />
                        </div>

                    </div>

                    <div className='filterProducts' >

                        <h4>Tipo</h4>

                        <ul>
                            <li>Frutas</li>
                            <li>Verduras</li>
                            <li>Legume</li>
                            <li>Grãos</li>
                            <li>Kits</li>
                        </ul>

                    </div>

                </div>

                {/* <div className="BarraLateral">

                    <nav>
                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="SubProduto">
                            <li><a href="#">SubProdutos</a>
                                <ul>
                                    <li><a href="#">Produto 1</a></li>
                                    <li><a href="#">Produto 2</a></li>
                                    <li><a href="#">Produto 3</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                </div> */}
            </div>
        </div>

        <Footer />

    </div>

  );
}

export default Home;
