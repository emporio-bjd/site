import React from 'react'
import './style.css'

import Header from '../../components/header'
import Footer from '../../components/footer'

import imgTeste4 from '../../img/imgTeste4.png'
import imgTeste2 from '../../img/imgTeste2.jpeg'
import imgTeste6 from '../../img/imgTeste6.webp'



function Cart() {

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
    ]

    return (
        <div className="App">

            <Header />

            <div className="cartPage">

                <div className="cart-left">
                    <h2>Seu carrinho de compras: </h2>

                    <section>

                            {
                                data.map(item => (

                                    <div className='boxHome'>

                                        <img src={item.imageSrc} alt='teste' />
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>

                                    </div>

                                ))
                            }

                        </section>

                </div>

                <div className="cart-right">
                    <div className="total">
                        <h2>Total (0 itens): </h2>
                        <button>Continuar pagamento</button>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Cart
