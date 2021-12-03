import React from 'react'
import BigHeader from '../../components/bigheader'
import Footer from '../../components/footer'
import './style.css'

import 'firebase/auth'
import 'firebase/database'

function Home() {

    return (

        <div className="App" >

            <BigHeader />

                <h1>HOME?</h1>

            <Footer />

        </div>

    );
}


export default Home;
