import React, { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function SellerList() {

    const [data, setData] = useState([]);
    const [displaySearchResult, setDisplaySearchResult] = useState('none');
    const [dataBackup, setDataBackup] = useState([]);
    const [dataSellers, setDataSellers] = useState([]);
    const [searchInput, setSearchInput] = useState([]);

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        firebase.database().ref('sellers').get('/sellers')
            .then(function (snapshot) {

                if (snapshot.exists()) {

                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataSellers(temp)
                    setData(temp)
                    setDataBackup(temp)
                }
                else {
                    console.log("No data available");
                }
            })

    }, [])

    function handleSearchInput(event) {

        if (event.key == 'Enter') {

            clearSearchName()
            searchName()

        }
        setSearchInput(event.target.value)

    }

    function searchName() {

        var name = []

        data.map((item) => {

            var nameToSearch = item.name.toLowerCase()
            var search = searchInput.toLowerCase()

            if (nameToSearch.includes(search))
                name.push(item)

        })

        setDataSellers(name)
        setDisplaySearchResult('flex')

    }

    function clearSearchName() {

        setDisplaySearchResult('none')
        setDataSellers(dataBackup)

    }

    return (

        <div className='ClientListPage'>

            <Header />

            <main id="mainClientList" >

                <h1>Informações dos usuários</h1>
                <span>Clique em um cartão para alterar os dados dos usuários</span>

                <div className='filterName' >

                    <h3>Pesquisa por nome</h3>

                    <div className='searchName'>

                        <input type="text" placeholder="Procurar..." onKeyDown={handleSearchInput} />

                    </div>

                </div>

                <section style={{ display: displaySearchResult }} className='searchNameResult' >

                    <div className='divSearchNameResult'>

                        <a onClick={() => { clearSearchName() }}>Limpar pesquisa</a>
                        <h3>Resultado da busca:</h3>

                    </div>

                </section>

                {dataSellers.map((item) => (

                    <div className="boxClientList">

                        <h3>{item.name}</h3>

                        <div>

                            <div>
                                <p><b>Telefone</b>: {item.phoneNumber}</p>
                                <p><b>E-mail</b>: {item.email}</p>
                            </div>

                        </div>

                    </div>

                ))}

            </main>

            <Footer />
        </div>

    )

}

export default SellerList