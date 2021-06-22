import React, {memo, useEffect, useState} from 'react'


import addIcon from '../../img/addIcon.png'
import removeIcon from '../../img/removeIcon2.png'


function BoxsHome(props) {
    
    const {item, index, data} = props;
    
    const [dataBox, setDataBox] = useState(data)

    useState(
        ()=>{console.log('rerere')}
        ,[dataBox])

    function add(index) {

        var dataTemp = data
        dataTemp[index].amount = dataTemp[index].amount + 1
    
        setDataBox(dataTemp)
        // setDisplayButtonFinishOrder('block')
    
    }
    
    function remove(index) {
    
        var dataTemp = data
        dataTemp[index].amount = dataTemp[index].amount - 1
    
        setDataBox(dataTemp)
        
    }
    
    if (dataBox.length == 0) {

        return (<div>a</div>)
        
    }
    else {

        return (

            <div>
                <p></p>

                {
                    dataBox.map((item, index) => {

                        if (item.itemAvailability == 'true') {

                            return(

                                <div className='boxHome'

                                // onClick={() => { handleModalInfos(item) }}
                                key={index}
                                >

                                    <div className='infoDivHome' >

                                        <img src={item.imageSrc} alt='imagem do produto' />

                                        <div className="itemInfo">

                                            <h3>{item.title}</h3>

                                            <h4>R$ {item.price}</h4>

                                            <p>{item.desc}</p>

                                        </div>

                                    </div>

                                    <div className='amountDiv' >

                                        <div>

                                            <img src={removeIcon} onClick={() => { remove(index) }} />
                                            quantidade: <b>{item.amount}</b>
                                            <img src={addIcon} onClick={() => { add(index) }} />

                                        </div>

                                    </div>

                                </div>

                            )

                        }

                    })
                }

            </div>

        )

    }
}

function areEqual(prevProps, nextProps) {
    if( prevProps === nextProps)
        return true
    else
        return false
}


export default React.memo(BoxsHome,areEqual )

