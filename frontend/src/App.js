import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './components/Navbar/Navbar.js';
import Home from './pages/Home/Home.js';
import Account from './pages/Account/Account.js';
import ShopCart from './pages/ShopCart/ShopCart.js';
import Product from './pages/Product/Product.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';

function App() {

  return ( 
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="account/:id" element={<Account/>}/>
        <Route path="/shopcart/:id" element={<ShopCart/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;