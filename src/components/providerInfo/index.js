import { useEffect, useState } from 'react'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'


function ProviderInfo() {

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

                        <div className="providerCard" >

                            <div className="providerNames">

                                <h2>{provider.tradeName}</h2>
                                <h4>{provider.corporateName}</h4>
                                
                            </div>

                            <div className="providerData">

                                <p><strong>Pessoa responsável:</strong> {provider.ownerName}</p>
                                <p><strong>Endereço:</strong> {provider.street}, {provider.district} - {provider.city}, {provider.state}</p>

                                <h3>Informações de contato</h3>

                                <p><strong>E-mail:</strong> {provider.email}</p>
                                <p><strong>Whatsapp:</strong> {provider.whatsapp}</p>
                                <p><strong>Telefone celular:</strong> {provider.cellphone}</p>
                                <p><strong>Telefone fixo:</strong> {provider.phone}</p>

                            </div>
                                
                        </div>
                        
                ))}

            </main>

        </div>

    )
    
}

export default ProviderInfo