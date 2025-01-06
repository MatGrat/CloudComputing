import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import styles from './Navbar.module.css';

function NavBar({ modeChange }) {
  const [checked, setChecked] = useState(false);

  const changeMode = () => {
    setChecked(!checked);
    modeChange(!checked);
  };

  return (
  <Navbar expand="lg" className={checked ? styles['bg-body-dark'] : styles['bg-body-light']}>
    <Container>
        <Navbar.Brand 
          href="/"
          className={checked ? styles['link-dark'] : styles['link-light']}
          >HomiShoppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="/account"
              className={checked ? styles['link-dark'] : styles['link-light']}
            >Account</Nav.Link>
            <Nav.Link 
              href="/shopcart"
              className={checked ? styles['link-dark'] : styles['link-light']}
              >ShopWagen</Nav.Link>
            <Form.Switch onChange={changeMode} checked={checked}/>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;