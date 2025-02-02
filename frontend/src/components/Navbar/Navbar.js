import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';

function NavBar() {
  const [accLink, setAccLink] = useState('/login');
  const [cartLink, setCartLink] = useState('/shopcart');

  useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
  
    if (cookies.loggedUser) {
      setAccLink(`/account/${cookies.loggedUser}`);
      const shopCartID = sessionStorage.getItem('currentShopCartID');
      if (shopCartID) {
        setCartLink(`/shopcart/${shopCartID}`);
      } 
    } else {
      setAccLink('/login');
      setCartLink('/login'); 
    }
  }, []);

  return (
  <Navbar expand="lg" className={styles['bg-body-light']}>
        <Navbar.Brand 
          href="/"
          className={styles['link-light-home']}
          >HomiShoppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link 
              href={accLink}
              className={styles['link-light-acc']}
            >Account</Nav.Link>
            <Nav.Link 
              href={cartLink}
              className={styles['link-light-shop']}
              >ShopWagen</Nav.Link>
          </Nav>
        </Navbar.Collapse>
  </Navbar>
  );
}

export default NavBar;