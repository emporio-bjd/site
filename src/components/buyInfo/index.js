import React from 'react'
import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function BuyInfo(props) {

    const { displayProperty, modalData } = props;

    const [dataAdmin, setDataAdmin] = useState([])

    return (

        <div style={{ display: displayProperty }} className='modalBuyInfo'>

            <main id='mainBuyInfo' >

                <div className="buyInfoTitle">
                    <h2>Sua lista de produtos adquiridos</h2>
                    <h4>{modalData.orderDate}</h4>
                </div>

                <p>{}</p>

                <h2>Total da compra: R$ 00,00</h2>

            </main>

        </div>

    )

}

export default BuyInfo