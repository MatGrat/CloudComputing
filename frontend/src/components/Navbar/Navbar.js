import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
        <Navbar.Brand href="/">HomiShoppi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="/shopcart">ShopWagen</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavBar;