import { useEffect, useState } from 'react'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import './style.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import firebaseConfig from '../../../FIREBASECONFIG.js'

function FeedbackBanner() {

    const [wasChanged, setWasChanged] = useState(false)
    const [dataAlterFeedback, setDataAlterFeedback] = useState({

        name: '',
        desc: '',
        
    })

    const [selectFeedback, setSelectFeedback] = useState('')
    const [selectFeedbackToDelete, setSelectFeedbackToDelete] = useState('')

    const [dataFeedback, setDataFeedback] = useState([])
    const [dataKeysFeedback, setDataKeysFeedback] = useState([])
    const [newDataFeedback, setNewDataFeedback] = useState({

        name: '',
        desc: '',

    })

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var firebaseRef = firebase.database().ref('feedback/');

        firebaseRef.on('value', (snapshot) => {
    
            if (snapshot.exists()) {

                var data = snapshot.val()
                var temp = Object.keys(data).map((key) => data[key])
                setDataFeedback(temp)
            }
            else {
                console.log("No data available");
            }
        })

    }, [])

    useEffect(() => {

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        var ref = firebase.database().ref("feedback");

        var keys = []

        ref.orderByKey().on("child_added", function (snapshot) {
            keys.push(snapshot.key);
        });

        setDataKeysFeedback(keys)

    }, []);

    function handleInputFeedbackChange(event) {

        const { name, value } = event.target

        console.log(name, value)

        setNewDataFeedback({

            ...newDataFeedback, [name]: value

        })

        console.log(newDataFeedback)

    }

    function handleInputFeedbackChangeAlter(event) {

        const { name, value } = event.target

        setDataAlterFeedback({

            ...dataAlterFeedback, [name]: value

        })

    }

    function handleSelectFeedback(event) {

        setSelectFeedback(event.target.value)
        console.log(dataFeedback[event.target.value])

    }

    function handleSelectFeedbackToDelete(event) {

        setSelectFeedbackToDelete(event.target.value)

    }

    function insertNewFeedback() {

        const id = firebase.database().ref().child('feedback').push().key

        const data = {

            name: newDataFeedback.name,
            desc: newDataFeedback.desc,
            id: id,

        }

        firebase.database().ref('feedback/' + id)
        .set(data)
        .then(err => console.log(err))

        setNewDataFeedback({

            name: '',
            desc: '',
    
        })

        alert("Feedback inserido com sucesso!")
        
    }

    function updateFeedback() {

        if (wasChanged) {

            firebase.database()
            .ref('feedback/' + dataKeysFeedback[selectFeedback])
            .update({

                name: dataAlterFeedback.name != '' ? dataAlterFeedback.name : dataFeedback[selectFeedback].name,
                desc: dataAlterFeedback.desc != '' ? dataAlterFeedback.desc : dataFeedback[selectFeedback].desc,

            })
            .then(() => alert("Item atualizado com sucesso!"))

        }

    }

    function deleteFeedback() {

        firebase.database()
            .ref('feedback/' + dataFeedback[selectFeedbackToDelete])
            .remove()
            .then(() => alert("Feedback removido com sucesso!"))

    }

    return (

        <div className='Feedback'>

            <Header />

            <main id='mainFeedback' >

                <div className='feedbackOptions' >

                    <fieldset>

                        <legend>
                            <h2>Inserir novo feedback</h2>
                            <h4>Máximo de 5</h4>
                        </legend>

                        <input name='name' onChange={handleInputFeedbackChange} placeholder='Nome' value={newDataFeedback.name}/>

                        <input name='desc' onChange={handleInputFeedbackChange} placeholder='Descrição' value={newDataFeedback.desc} />

                        <a onClick={()=>{insertNewFeedback()}} >Inserir</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Alterar feedback</h2>
                        </legend>

                        <select onChange={handleSelectFeedback} >

                            <option>Selecione o item</option>

                            {dataFeedback.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.name}</option>

                                )

                            })}

                        </select>

                        <h6>Preencha o que deseja alterar</h6>

                        <input name='name' onChange={handleInputFeedbackChangeAlter} placeholder='Nome' value={dataFeedback[selectFeedback]?.name} />

                        <input name='desc' onChange={handleInputFeedbackChangeAlter} placeholder='Descrição' value={dataFeedback[selectFeedback]?.desc} />

                        <a onClick={() => { setWasChanged(true); updateFeedback(); }} >Alterar</a>

                    </fieldset>

                    <fieldset>

                        <legend>
                            <h2>Apagar feedback</h2>
                        </legend>

                        <select onChange={handleSelectFeedbackToDelete} >

                            <option>Selecione o feedback</option>

                            {dataFeedback.map((item, index) => {

                                return (

                                    <option value={index} key={index}>{item.name}</option>

                                )

                            })}

                        </select>

                        <a onClick={() => { deleteFeedback() }} >Apagar</a>

                    </fieldset>

                </div>

            </main>

            <Footer />

        </div>

    )

}

export default FeedbackBanner