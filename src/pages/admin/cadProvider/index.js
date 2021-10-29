import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header'
import Footer from '../../../components/footer'
import ProviderInfo from '../../../components/providerInfo'
import './style.css'

import InputMask from 'react-input-mask';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function Provider() {

    const [dataAlterProvider, setDataAlterProvider] = useState({

        corporateName: '',
        tradeName: '',
        ownerName: '',
        email: '',
        address: '',
        district: '',
        city: '',
        state: '',
        phone: '',
        cellphone: '',
        whatsapp: '',
        products: []

    })

    const [selectProvider, setSelectProvider] = useState('')
    const [selectProviderToDelete, setSelectProviderToDelete] = useState('')

    const [dataKeysAdm, setDataKeysAdm] = useState([])
    const [dataProvider, setDataProvider] = useState([])

    const [newDataProvider, setNewDataProvider] = useState({

        corporateName: '',
        tradeName: '',
        ownerName: '',
        email: '',
        address: '',
        district: '',
        city: '',
        state: '',
        phone: '',
        cellphone: '',
        whatsapp: '',
        products: []

    })

    function handleInputProviderChange(event) {

        const { name, value } = event.target

        setNewDataProvider({

            ...newDataProvider, [name]: value,

        })

    }

    function handleInputProviderChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterProvider({

            ...dataAlterProvider, [name]: value

        })

    }

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

            var firebaseRef = firebase.database().ref('providers/');

            firebaseRef.on('value', (snapshot) => {
    
                if (snapshot.exists()) {
    
                    var data = snapshot.val()
                    var temp = Object.keys(data).map((key) => data[key])
                    setDataProvider(temp.sort((a,b)=> {
    
                      return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)
    
                    }))
                }
                else {
                  console.log("No data available");
                }
            })

    }, [])

    useEffect(() => {

        if(dataProvider) {

            var keys = []
            dataProvider.map((item) => keys.push(item.id))
            setDataKeysAdm(keys)

        }

    }, [dataProvider]);

    function handleSelectProvider(event) {

        setSelectProvider(event.target.value)

        setDataAlterProvider(dataProvider[event.target.value])

    }

    function handleSelectProviderToDelete(event) {

        setSelectProviderToDelete(event.target.value)

    }

    function insertNewProvider() {

        const id = firebase.database().ref().child('posts').push().key

        const data = {
            
            corporateName: newDataProvider.corporateName,
            tradeName: newDataProvider.tradeName,
            ownerName: newDataProvider.ownerName,
            email: newDataProvider.email,
            address: newDataProvider.address,
            district: newDataProvider.district,
            city: newDataProvider.city,
            state: newDataProvider.state,
            phone: newDataProvider.phone,
            cellphone: newDataProvider.cellphone,
            whatsapp: newDataProvider.whatsapp,
            id: id,
            products: [{}]

        }

        firebase.database().ref('providers/' + id)
        .set(data)
        .then(err => console.log(err))

        setNewDataProvider({

            corporateName: '',
            tradeName: '',
            ownerName: '',
            email: '',
            address: '',
            district: '',
            city: '',
            state: '',
            phone: '',
            cellphone: '',
            whatsapp: '',
            products: []

        })

        alert("Fornecedor cadastrado com sucesso!");
        window.location.reload()

    }

    function updateProvider() {

        const newProvider ={

            corporateName: dataAlterProvider.corporateName != '' ? dataAlterProvider.corporateName : dataProvider[selectProvider].corporateName,
            tradeName: dataAlterProvider.tradeName != '' ? dataAlterProvider.tradeName : dataProvider[selectProvider].tradeName,
            ownerName: dataAlterProvider.ownerName != '' ? dataAlterProvider.ownerName : dataProvider[selectProvider].ownerName,
            email: dataAlterProvider.email != '' ? dataAlterProvider.email : dataProvider[selectProvider].email,
            address: dataAlterProvider.address != '' ? dataAlterProvider.address : dataProvider[selectProvider].address,
            district: dataAlterProvider.district != '' ? dataAlterProvider.district : dataProvider[selectProvider].district,
            city: dataAlterProvider.city != '' ? dataAlterProvider.city : dataProvider[selectProvider].city,
            state: dataAlterProvider.state != '' ? dataAlterProvider.state : dataProvider[selectProvider].state,
            phone: dataAlterProvider.phone != '' ? dataAlterProvider.phone : dataProvider[selectProvider].phone,
            cellphone: dataAlterProvider.cellphone != '' ? dataAlterProvider.cellphone : dataProvider[selectProvider].cellphone,
            whatsapp: dataAlterProvider.whatsapp != '' ? dataAlterProvider.whatsapp : dataProvider[selectProvider].whatsapp,

        }

        firebase.database()
        .ref('providers/' + dataKeysAdm[selectProvider])
        .update(newProvider)
        .then(() => alert("Informação atualizada com sucesso!"))
        window.location.reload()

    }

    function deleteProvider() {

        firebase.database()
            .ref('providers/' + dataKeysAdm[selectProviderToDelete])
            .remove()
            .then(() => alert("Fornecedor removido com sucesso!"))
            window.location.reload()
            
    }

    const [displayHistory, setDisplayHistory] = useState("none");
    const [HistoryData, setHistoryData] = useState({});
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {

        window.scrollTo(0, 0);
        setPageHeight(window.screen.height)

    }, []);

    function handleHistoryInfos() {

        setHistoryData();

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    function closeHistory() {

        displayHistory == "none" ? setDisplayHistory("flex") : setDisplayHistory("none")

    }

    return (

        <div className='Provider'>

            <Header />

            <div style={{ display: displayHistory }} tabindex="-1" role="dialog" className='divHistory' >
                <span onClick={closeHistory}>X</span>
                <ProviderInfo displayProperty={displayHistory} HistoryData={HistoryData} />
            </div>

            <main id='mainProvider' >

                <div className='titleProvider' >

                    <h1>Painel de controle de fornecedores</h1>

                    <div className="optionProvider">

                        <ul>

                            <span onClick={() => { handleHistoryInfos() }}>Informação dos fornecedores</span>
                            {/* <Link to='/AdminProdutoFornecedor' >Cadastrar produtos dos fornecedores</Link> */}
                            <Link to='/PedidoFornecedor' >Realizar pedido do fornecedor</Link>
                            <Link to='/AdminHistorico' >Histórico de pedidos</Link>

                        </ul>

                    </div>

                </div>

                <div className='providerOptions' >

                    <fieldset className='registerSection' >

                        <legend className='registerTitle'>
                            <h2>Cadastrar fornecedor</h2>
                            <h5>Preencha os dados do fornecedor abaixo.</h5>
                        </legend>

                        <input name='corporateName' onChange={handleInputProviderChange} placeholder='Razão social da empresa' value={newDataProvider.corporateName}/>

                        <input name='tradeName' onChange={handleInputProviderChange} placeholder='Nome fantasia da empresa' value={newDataProvider.tradeName}/>

                        <input name='ownerName' onChange={handleInputProviderChange} placeholder='Pessoa responsável' value={newDataProvider.ownerName} />

                        <input name='email' onChange={handleInputProviderChange} placeholder='E-mail' value={newDataProvider.email} />

                        <input name='address' onChange={handleInputProviderChange} placeholder='Endereço' value={newDataProvider.address} />

                        <input name='district' onChange={handleInputProviderChange} placeholder='Bairro' value={newDataProvider.district} />

                        <input name='city' onChange={handleInputProviderChange} placeholder='Município' value={newDataProvider.city}/>

                        <input name='state' onChange={handleInputProviderChange} placeholder='Estado' value={newDataProvider.state}/>

                        <InputMask 
                            name='phone' 
                            type='tel' 
                            mask="(99) 9999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChange} 
                            value={newDataProvider.phone} 
                            placeholder='Telefone fixo' 
                        />

                        <InputMask 
                            name='cellphone' 
                            type='tel' 
                            mask="(99) 99999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChange} 
                            value={newDataProvider.cellphone} 
                            placeholder='Celular' 
                        />

                        <InputMask 
                            name='whatsapp' 
                            type='tel' 
                            mask="(99) 99999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChange} 
                            value={newDataProvider.whatsapp} 
                            placeholder='Whatsapp' 
                        />

                        <a onClick={() => { insertNewProvider() }} >Cadastrar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar dados de fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProvider} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option value={index} key={index}>{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input 
                            name='corporateName' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Razão social da empresa'
                            value={dataAlterProvider.corporateName}
                        />

                        <input 
                            name='tradeName' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Nome fantasia da empresa'
                            value={dataAlterProvider.tradeName}
                        />

                        <input 
                            name='ownerName' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Pessoa responsável'
                            value={dataAlterProvider.ownerName}
                        />

                        <input 
                            name='email' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='E-mail'
                            value={dataAlterProvider.email}
                        />

                        <input 
                            name='address' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Endereço'
                            value={dataAlterProvider.address}
                        />

                        <input 
                            name='district' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Bairro'
                            value={dataAlterProvider.district}
                        />

                        <input 
                            name='city' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Município'
                            value={dataAlterProvider.city}
                        />

                        <input 
                            name='state' 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Estado'
                            value={dataAlterProvider.state}
                        />

                        <InputMask 
                            name='phone' 
                            type='tel' mask="(99) 9999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Telefone fixo'
                            value={dataAlterProvider.phone}
                        />

                        <InputMask 
                            name='cellphone' 
                            type='tel' mask="(99) 99999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Celular'
                            value={dataAlterProvider.cellphone}
                        />

                        <InputMask 
                            name='whatsapp' 
                            type='tel' mask="(99) 99999-9999" 
                            maskChar=" " 
                            onChange={handleInputProviderChangeAlter} 
                            placeholder='Whatsapp'
                            value={dataAlterProvider.whatsapp}
                        />

                        <a onClick={() => {updateProvider(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar fornecedor</h2>
                        </legend>

                        <select onChange={handleSelectProviderToDelete} >

                            <option>Selecione o fornecedor</option>

                            {dataProvider.map((providers, index) => {

                                return (

                                    <option key={index} value={index} >{providers.tradeName}</option>

                                )

                            })}

                        </select>

                        <a onClick={() => { deleteProvider() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default Provider