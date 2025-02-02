import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './components/Navbar/Navbar.js';
import Home from './pages/Home/Home.js';
import Account from './pages/Account/Account.js';
import ShopCart from './pages/ShopCart/ShopCart.js';
import Product from './pages/Product/Product.js';
import Register from './pages/Register/Register.js';
import Login from './pages/Login/Login.js';
import { GetShopCarts } from './hooks/shop-cart-hook.js';

function App() {
  const {data: shopCarts } = GetShopCarts();

  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  var foundShopCart = null;
  if(cookies != null && shopCarts != null) {
    foundShopCart = shopCarts.find((shopCart) => parseInt(shopCart.UserID) === parseInt(cookies.loggedUser));
  } 

  if (foundShopCart) {
    sessionStorage.setItem('currentShopCartID', foundShopCart.ShopCartID);
  } 

  return ( 
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="account/:id" element={<Account/>}/>
        {cookies.loggedUser && foundShopCart ? (
          <Route
            path={`shopcart/${foundShopCart.ShopCartID}`}
            element={<ShopCart shopCartId={foundShopCart.ShopCartID} />}
          />
        ) : (
          <Route path="/shopcart" element={<Login />} />
        )}
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;