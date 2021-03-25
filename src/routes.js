import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'
import Register from './pages/register'
import About from './pages/about'
import Products from './pages/products'
import Cart from './pages/cart'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato'/>
            <Route component={Register} path='/entrar'/>
            <Route component={About} path='/Quem-somos-nos' />
            <Route component={Products} path='/produtos' />
            <Route component={Cart} path='/Carrinho' />
        
        </BrowserRouter>

    )

}

export default Routes;