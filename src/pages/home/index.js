import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import logoEmporio from '../../img/visualChanges/logoBranca.png'
import HeaderTop from '../../img/visualChanges/Barra_up.png'
import HeaderSwirls from '../../img/visualChanges/Barra_swirls up.png'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

import heroImg from '../../img/heroImg3.jpg'

function Home() {

    const [data, setData] = useState([])
    const [dataBackup, setDataBackup] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const [minProductPrice, setMinProductPrice] = useState(0)
    const [maxProductPrice, setMaxProductPrice] = useState(999)
    const [displaySearchResult, setDisplaySearchResult] = useState('none')
    const [displayMobileSearch, setDisplayMobileSearch] = useState('none')
    const [displayButtonFinishOrder, setDisplayButtonFinishOrder] = useState('none')
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('items/');

        firebaseRef.on('value', (snapshot) => {

            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))

                setData(temp)
                setDataBackup(temp)

            }
            else {
                console.log("No data available");
            }

        });

    }, [])

    function handleSearchInput(event) {

        if (event.key == 'Enter') {

            clearSearchItem()
            searchItem()

        }
        setSearchInput(event.target.value)

    }

    function handleMinProductPrice(event) {

        if (event.key == 'Enter')
            filterItemByPrice()

    }

    function handleMaxProductPrice(event) {

        if (event.key == 'Enter')
            filterItemByPrice()

    }

    function handleDisplaySearchMobile() {

        if (displayMobileSearch == 'none')
            setDisplayMobileSearch('flex')
        else
            setDisplayMobileSearch('none')

    }

    function searchItem() {

        var itens = []

        data.map((item) => {

            var title = item.title.toLowerCase()
            var desc = item.desc.toLowerCase()
            var search = searchInput.toLowerCase()

            // if (title.includes(searchInput) || desc.includes(searchInput))
            if (title.includes(search))
                itens.push(item)

        })

        setData(itens)
        setDisplaySearchResult('flex')

    }

    function filterItemByPrice() {

        var itens = []

        data.map((item) => {

            if (Number(item.price) >= minProductPrice && Number(item.price) <= maxProductPrice)
                itens.push(item)

        })

        setData(itens)
        setDisplaySearchResult('flex')

    }

    function clearSearchItem() {

        setDisplaySearchResult('none')
        setData(dataBackup)

    }

    function add(index) {

        var dataTemp = data
        dataTemp[index].amount = Number(dataTemp[index].amount + 1)

        console.log(typeof dataTemp[index].amount)

        var totalValueTemp = Number(dataTemp[index].price) + totalValue

        setData(dataTemp)
        setTotalValue(totalValueTemp)
        setDisplayButtonFinishOrder('block')

    }

    function remove(index) {

        var dataTemp = data

        if (dataTemp[index].amount > 0) {

            dataTemp[index].amount = dataTemp[index].amount - 1
            var totalValueTemp = totalValue - Number(dataTemp[index].price)

            setData(dataTemp)
            setTotalValue(totalValueTemp)

        }

    }

    let history = useHistory();

    function addToCart() {

        const temp = JSON.parse(localStorage.getItem('products'))
        var listOfItems = temp !== null ? Object.keys(temp).map((key) => temp[key]) : []

        const newItems = []

        data.map((item) => {

            if (item.amount > 0)
                newItems.push(item)

        })

        if (listOfItems.length > 0) {

            newItems.map(item => listOfItems.push(item))

            console.log('listOfItems', listOfItems)

            localStorage.setItem('products', JSON.stringify(listOfItems))

        }
        else {

            newItems.map(item => listOfItems.push(item))
            localStorage.setItem('products', JSON.stringify(listOfItems))

        }

        history.push('/Carrinho')

    }

    return (

        <div className="App" >

            {/* <Header /> */}

            <section id="HeroHeader">

                <div className="headerWrapper">

                    <div className="topHeader">

                        <div className="navigationLinks">

                            <ul>

                                <li>Início</li>
                                <li>Quem somos</li>
                                <li>Contato</li>

                            </ul>

                        </div>

                        <img src={HeaderTop} alt="" />

                        <div className="logoWrapper">

                            <img src={logoEmporio} alt="" />

                            <div className="textHeaderHero">

                                <p>Alimentos orgânicos: mais saúde na sua mesa!</p>
                                <p>Produtos selecionados.</p>

                            </div>

                        </div>

                    </div>

                    <img className="bottomHeader" src={HeaderSwirls} alt="" />

                </div>

            </section>

            <section id='heroSection'>

                <div className='introHome' >

                    <img src={heroImg} alt="Imagem inicial" />

                    <div className="heroText">

                        <h2>
                            Alimentos orgânicos: mais saúde na sua mesa!
                            <br />Produtos selecionados.
                        </h2>

                    </div>

                </div>

                <div className="borderImg" />

            </section>

            <div className="filterProductsOptions" onClick={() => handleDisplaySearchMobile()} >
                <h3>Filtrar produtos</h3>
            </div>

            <section className='sectionMobileSearch' style={{ display: displayMobileSearch }} >

                <div className='menuProductsHomeMobile' >

                    <div className='filterProductsMobile' >

                        <h4>Pesquisar produto</h4>

                        <div className='searchMobile'>

                            <input type="text" placeholder="Procurar.." onKeyDown={handleSearchInput} />

                        </div>

                    </div>

                    <div className='filterProductsMobile' >

                        <h4>Preço</h4>

                        <div className='filtersInputsMobile'>
                            <input
                                placeholder='min'
                                type='number'
                                onChange={(event) => setMinProductPrice(Number(event.target.value))}
                                onKeyDown={handleMinProductPrice} />
                            <p> - </p>
                            <input
                                placeholder='max'
                                type='number'
                                onChange={(event) => setMaxProductPrice(Number(event.target.value))}
                                onKeyDown={handleMaxProductPrice} />
                        </div>

                    </div>

                </div>

            </section>

            <section style={{ display: displaySearchResult }} className='sectionSearchResult' >

                <div className='divSearchResult'>

                    <h3>Resultado da busca:</h3>
                    <a onClick={() => { clearSearchItem() }}>Limpar pesquisa</a>

                </div>

            </section>

            <p className="tipHome" >Selecione a quantidade e depois clique para finalizar o pedido</p>

            <div className='containerHome' >

                <div className='productsHome'>

                    <section id='sectionHome'>

                        {
                            data.map((item, index) => {

                                if (item.itemAvailability === 'true' && item.showItem === 'true') {

                                    return (

                                        <div className='boxHome'

                                            // onClick={() => { handleModalInfos(item) }}
                                            key={index}
                                        >

                                            <div className='infoDivHome' >

                                                <img src={item.imageSrc} alt='imagem do produto' />

                                                <div className="itemInfo">

                                                    <h3>{item.title}</h3>

                                                    <h4>
                                                        R$ {item.price}
                                                        <p>({item.unity})</p>
                                                    </h4>

                                                    <p>{item.desc}</p>

                                                    <div>

                                                        <p><b>Categoria: </b>{item.category}</p>
                                                        {/* 
                                                        {
                                                            item.unityPrice > 0 ?
                                                            <p>
                                                                <b>Unidade R$:  </b>
                                                                {Number(item.unityPrice).toFixed(2)}
                                                            </p>
                                                            : null
                                                        } */}
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='amountDiv' >

                                                <div>

                                                    <span onClick={() => { remove(index) }}>-</span>
                                                    Quantidade: <b>{item.amount}</b>
                                                    <span onClick={() => { add(index) }}>+</span>

                                                </div>

                                            </div>

                                        </div>

                                    )

                                }

                            })
                        }

                    </section>

                </div>

                <div className="areaLateral" >

                    <div className='menuProductsHome' >

                        <div className='filterProducts' >

                            <h4>Pesquisar produto</h4>

                            <div className='search'>

                                <input type="text" placeholder="Procurar.." onKeyDown={handleSearchInput} />

                            </div>

                        </div>

                        <div className='filterProducts' style={{ borderBottom: '10px solid #ffc05c', paddingBottom: '15px' }}>

                            <h4>Preço</h4>

                            <div className='filtersInputs'>
                                <input
                                    placeholder='min'
                                    type='number'
                                    onChange={(event) => setMinProductPrice(Number(event.target.value))}
                                    onKeyDown={handleMinProductPrice} />
                                -
                                <input
                                    placeholder='max'
                                    type='number'
                                    onChange={(event) => setMaxProductPrice(Number(event.target.value))}
                                    onKeyDown={handleMaxProductPrice} />
                            </div>

                        </div>

                        <div className='balloonHome' >

                            <div className='insideOfBalloonHome'>

                                <p>Para comprar, clique em um produto e escolha a quantidade que deseja. Assim que selecionar todos os produtos, vá ao carrinho</p>

                            </div>

                        </div>

                        <div className='balloonHome' >

                            <p>colocar num esquema de "balões"</p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="buttonFinishOrder" style={{ display: displayButtonFinishOrder }}>
                <a onClick={() => addToCart()}>FINALIZAR PEDIDO - R$ {totalValue.toFixed(2)}</a>
            </div>

            <Footer />

        </div>

    );
}


export default Home;
