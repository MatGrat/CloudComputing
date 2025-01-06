import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './components/Navbar/Navbar.js';
import Home from './pages/Home/Home.js';
import Account from './pages/Account/Account.js';
import ShopCart from './pages/ShopCart/ShopCart.js';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);

  const modeChange = (newMode) => {
    setChecked(newMode);
  };

  return ( 
    <BrowserRouter>
      <NavBar modeChange={modeChange} />
      <Routes>
        <Route path="/" element={<Home checked={checked}/>}/>
        <Route path="account" element={<Account/>}/>
        <Route path="/shopcart" element={<ShopCart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;