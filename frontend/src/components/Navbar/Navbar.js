import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';

function NavBar() {
  const [accLink, setAccLink] = useState('/login');

  useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    if (cookies.loggedUser) {
      setAccLink(`/account/${cookies.loggedUser}`); 
    } else {
      setAccLink('/login'); 
    }
  }, []); 


  return (
  <Navbar expand="lg" className={styles['bg-body-light']}>
    <Container>
        <Navbar.Brand 
          href="/"
          className={styles['link-light']}
          >HomiShoppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href={accLink}
              className={styles['link-light']}
            >Account</Nav.Link>
            <Nav.Link 
              href="/shopcart"
              className={styles['link-light']}
              >ShopWagen</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;