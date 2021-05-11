import { useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'
import './style.css'

// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
// import firebaseConfig from '../../../FIREBASECONFIG.js'


function Admin() {


    return (

        <div className='Admin'>

            <Header />

            <main id='mainAdmin' >

                <div className='titleAdmin' >
                    <h1>Bem vindos, equipe Empório Bom Jardim 💛</h1>
                </div>

                <div className='titleAdmin' >
                    <h3>O que deseja fazer?</h3>
                </div>

                <div className='optionAdminPage' >

                    <ul>
                        <li> <Link to="/AdminItems" >Cadastro/alteração de itens</Link> </li>
                        <li> <Link to="/AdminVendor" >Cadastro/alteração de vendedores</Link> </li>
                        <li> <Link to="/AdminFornecedor" >Cadastro/alteração de fornecedores </Link> </li>
                    </ul>

                </div>
                
            </main>

            <Footer />
        </div>

    )
    
}

export default Admin