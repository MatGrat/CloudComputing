import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './components/Navbar/Navbar.js';
import Home from './pages/Home/Home.js';
import Account from './pages/Account/Account.js';
import ShopCart from './pages/ShopCart/ShopCart.js';

function App() {
  return ( 
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="/shopcart" element={<ShopCart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;