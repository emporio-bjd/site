import React, {useState} from "react";
import "./style.css";

import shoppingCart from '../../img/shoppingCart.png'
import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon.png'

function Modal (props) {

    const { displayProperty, modalData } = props;

    return(

        <div style={{display: displayProperty}} className='modal'>

            <main>

                <p>Selecione a quantidade e depois adicione o item ao carrinho</p>

                <img src={modalData.imageSrc} alt='imagem do produto' className='productImageModal' />
                <h1>{modalData.title}</h1>

                <div className='lineBoxProductModal'>

                    <h3>R$ {modalData.price}</h3>

                    <div className="quantityOfProduct" >
                        <img src={removeIcon}/>
                        <p>Quantidade</p>
                        <img src={addIcon}/>
                    </div>

                </div>

                    <a>ADICIONAR AO CARRINHO</a>
                {/* <div className='lineBoxProductModal'>

                    <h3>Quantidade</h3>
                    <img src={shoppingCart}/>

                </div> */}

                <p>{modalData.desc}</p>

            </main>

        </div>
    )
}

export default Modal;