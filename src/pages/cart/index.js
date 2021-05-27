import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseConfig from '../../FIREBASECONFIG.js'

import closeIcon from '../../img/removeIcon.png'

function Cart() {

    const [ data, setData ] = useState([]);
    const [dataAccount, setDataAccount] = useState([]);
    const [ totalValue, setTotalValue ] = useState(0);
    const [ dataExists, setDataExists ] = useState(false);
    const [userIsLogged, setUserIsLogged] = useState(false);
    
    const [selectedPayment, setSelectedPayment] = useState('');

    const [redirect, setRedirect] = useState(useHistory());

    function onAuthStateChanged(user) {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) 
              setUserIsLogged(true)
          });
        
    }

    useEffect(async () => {

        const verify = await JSON.parse(localStorage.getItem('products'))
    
        if (verify != null && verify.length > 1){

            console.log("verify:")
            console.log(verify)
            
            setData(verify)
            setDataExists(true)

            var total = 0

            verify.map((item)=>{

                if(item.data != undefined){

                    var value = ( Number(item.data.price) * Number(item.amount) )
                    total = value + total
                        
                }

                setTotalValue(total)
            })

        }
        else
            setDataExists(false)

    },[])

    useEffect(()=>{

        window.scrollTo(0, 0);
        
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
        onAuthStateChanged()

    },[])

    useEffect(() => {

        const userEmail = localStorage.getItem('userEmail')        

        firebase.database().ref('users/').get('/users')
        .then(function (snapshot) {

            if (snapshot.exists()){

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])

                temp.map((item)=>{ 

                    if(item.email == userEmail){
                        setDataAccount(item)
                    }

                })

            }else 
                console.log("No data available");

        })

    }, []);

    function sendOrder () {

        if(userIsLogged){

            const id = firebase.database().ref().child('posts').push().key

            firebase.database().ref('requests/' + id).set({

                id: id,
                listItem: data,
                totalValue: totalValue.toFixed(2),
                userName: dataAccount.name,
                phoneNumber: dataAccount.phoneNumber,
                street: dataAccount.street,
                houseNumber: dataAccount.houseNumber,
                district: dataAccount.district,
                cepNumber: dataAccount.cepNumber,
                complement: dataAccount.complement,
                paymentType: selectedPayment


            }).then(()=>{
                localStorage.setItem('products', '[{}]')
                alert("Pedido finalizado com sucesso!.")
            })

        }
        else {
            
            var confirm = window.confirm("Você precisa ter uma conta para finalizar um pedido!.")

            if(confirm)
                redirect.push("/Cadastro")

        }

        return 0;

    }

    function handleSelectPayment (event) {

        setSelectedPayment(event.target.value)

    }

    function removeItemInCart(index) {

        data.splice(index, 1);
        console.log("data:")
        console.log((data))
        localStorage.setItem('products', JSON.stringify(data))
        alert('removido com sucesso')
        
    }

    if (dataExists) {

        return (
            <div className="CartPage">

                <Header />

                <div className='textIntroCart' >
                    <h2>Seus itens no carrinho de compras: </h2>
                    <p>Após revisar os itens, clique no botão para finalizar o pedido </p>
                </div>

                <section className='sectionCart flexDisplay'>

                    {
                        data.map((item,index) => {

                            if (index != 0) {

                                return (

                                    <div className='boxCart flexDisplayCart'>

                                        <div className='lineBoxCardProduct nameProductInCart' >

                                            <img src={item.data.imageSrc} alt='imagem do produto' className="imgProductCart" />
                                            <h3>{item.data.title}</h3>

                                        </div>

                                        <div className='lineBoxCardProduct flexDisplayCart infoProductInCart'>

                                            <h4>R$ {((item.data.price) * item.amount).toFixed(2)}</h4>
                                            <h5>qnt.:{item.amount}</h5>

                                        </div>

                                        <img src={closeIcon}
                                            className="imgRemoveIconCart"
                                            alt='opção de remover item'
                                            onClick={()=>{
                                                removeItemInCart(index)
                                            }}
                                        />

                                    </div>
                                )
                            }

                        })
                    }

                    <h3>Valor total: {totalValue.toFixed(2)}</h3>


                    <select className="paymentSelect" onChange={handleSelectPayment} >

                        <option>Selecione o tipo de pagamento</option>
                        <option value="Cartão" >Cartão de crédito ou débito</option>
                        <option value="Dinheiro" >Dinheiro</option>
                        <option value="Pix" >Pix</option>

                    </select>


                </section>

                <div className='checkOut' >
                    <a onClick={()=>sendOrder()} >Finalizar pedido</a>
                </div>

                <Footer />

            </div>
        )

    }else {

        return (

            <div className="CartPage">

                <Header />

                <div className="emptyCart" style={{height: "60vh", display: "flex", alignItems: "center", justifyContent: "center"}} >
                    <h2>Seu carrinho de compras está vazio 😧 </h2>
                </div>

                <Footer />

            </div>

        )

    }
}

export default Cart