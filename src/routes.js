import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home/index'
import Contact from './pages/contact'
import About from './pages/about'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato'/>
            <Route component={About} path='/Quem-somos-nos' />
       
        </BrowserRouter>

    )

}

export default Routes;