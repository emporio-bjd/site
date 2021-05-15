import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home'
import Contact from './pages/contact'
import Register from './pages/register'
import SignIn from './pages/signIn'
import About from './pages/about'
import Cart from './pages/cart'
import Admin from './pages/admin'
import Items from './pages/admin/items'
import Provider from './pages/admin/cadProvider'
import VendorRegister from './pages/admin/vendorregister'
import Request from './pages/admin/requests'
import userProfile from './pages/userProfile'

const Routes = () => {

    return (

        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Contact} path='/contato'/>
            <Route component={Register} path='/Cadastro'/>
            <Route component={SignIn} path='/Entrar'/>
            <Route component={About} path='/Quem-somos-nos' />
            <Route component={Cart} path='/Carrinho' />
            <Route component={Admin} path='/Admin' />
            <Route component={Items} path='/AdminItems' />
            <Route component={Provider} path='/AdminFornecedor' />
            <Route component={VendorRegister} path='/AdminVendor' />
            <Route component={userProfile} path='/Perfil' />
            <Route component={Request} path='/Pedidos' />
        
        </BrowserRouter>

    )

}

export default Routes;