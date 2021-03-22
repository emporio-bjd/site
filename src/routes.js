import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato'/>
        
        </BrowserRouter>

    )

}

export default Routes;