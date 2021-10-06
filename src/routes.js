import {React} from 'react'
import { Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/home/index'
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
import OrderHistory from './pages/admin/orderHistory'
import ClientsList from './pages/admin/clientsList'
import SellersList from './pages/admin/sellerList'
import Seller from './pages/seller'
import ProviderRequests from './pages/admin/providerRequests'
import ProviderProducts from './pages/admin/cadProviderProduct'
import DeliveryList from './pages/admin/deliveryList'
import CartProvider from './pages/admin/cartProvider'
import Reports from './pages/admin/reports'
import Stock from './pages/admin/stock'
import FeedbackBanner from './pages/admin/banner'
import ForgotPassword from './pages/forgotPassword'

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
            <Route component={VendorRegister} path='/AdminVendedor' />
            <Route component={userProfile} path='/Perfil' />
            <Route component={Request} path='/Pedidos' />
            <Route component={OrderHistory} path='/AdminHistorico' />
            <Route component={ClientsList} path='/ListaDeClientes' />
            <Route component={SellersList} path='/ListaDeVendedores' />
            <Route component={Seller} path='/Vendedor' />
            <Route component={ProviderRequests} path='/PedidoFornecedor' />
            <Route component={ProviderProducts} path='/AdminProdutoFornecedor' />
            <Route component={DeliveryList} path='/Entregas' />
            <Route component={CartProvider} path='/CarrinhoFornecedor' />
            <Route component={Reports} path='/Relatorios' />
            <Route component={Stock} path='/Estoque' />
            <Route component={FeedbackBanner} path='/Banner' />
            <Route component={ForgotPassword} path='/RecuperarSenha' />
        
        </BrowserRouter>

    )

}

export default Routes;