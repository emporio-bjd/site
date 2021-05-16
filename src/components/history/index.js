import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function History() {

    const [dataAdmin, setDataAdmin] = useState([])
  
    useEffect(()=>{

        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('providers').get('/providers')
        .then(function(snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataAdmin(temp)

            }
            
        })

    },[])

    return (

        <div className='historyModal'>

            <main id='mainHistory' >
    
                {dataAdmin.map((provider)=> (

                    <div className="providerInfo">

                        <div className="providerCard" >

                            <div className="providerTitle">
                                <h2>{provider.company}</h2>
                            </div>
                                
                            <p>Nome do contato: </p>
                            <b>{provider.name}</b>
                                
                            <p>E-mail:</p>
                            <b>{provider.email}</b>
                                
                            <p>Telefone:</p>
                            <b>{provider.phone}</b>

                            <p>ID do fornecedor:</p>
                            <b>{provider.id}</b>

                        </div>
                        
                    </div>

                ))}

            </main>

        </div>

    )
    
}

export default History