import React, { useState} from "react";
import { useAuth } from '../../provider'
import "./style.css";

import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon.png'

function Modal (props) {

    const { displayProperty, modalData } = props;
    const { products, setProducts } = useAuth();
    const [amount, setAmount] = useState(1);

    function add() {

        amount >= 0 ? setAmount( amount + 1) : setAmount(0)
        
    }

    function remove() {

        amount > 0 ? setAmount( amount - 1) : setAmount(0)
        
    }

    function addToCart() {

        const listOfItems = JSON.parse(localStorage.getItem('products'))

        if (listOfItems != null) {
        
            if(listOfItems == [{}]){
                
                localStorage.removeItem('products')
                const newItem = []
                newItem.push({data: modalData, amount: amount})
                localStorage.setItem('products', JSON.stringify(newItem))
                alert("Adicionado com sucesso!")

            }else {

                const newItem = JSON.parse(localStorage.getItem('products'))
                newItem.push({data: modalData, amount: amount})
                localStorage.setItem('products', JSON.stringify(newItem))
                alert("Adicionado com sucesso!")

            }

            setAmount(1)

        }else {

            const newItem = [{data: modalData, amount: amount}]
            localStorage.setItem('products', JSON.stringify(newItem))
            alert("Adicionado com sucesso!")
            setAmount(1)

        }
        
        // const newItem = [...products]
        // newItem.push({id: modalData.id, amount: amount})
        // setProducts(newItem)
        // Tentativa de fazer com providers
        
    }

    return(

        <div className='modal'>

            <main>

                <h2>Seu histórico de pedidos está vazio</h2>

            </main>

        </div>
    )
}

export default Modal;