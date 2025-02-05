import { useParams } from "react-router-dom";
import { GetUser } from '../../hooks/user-hook';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { GetOrderHistoryProducts } from '../../hooks/order-history-hook';
import { GetShopCarts, CreateShopCart } from '../../hooks/shop-cart-hook';
import { CreateOrder } from '../../hooks/order-hook';

function Account() {
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});
  const {data: products } = GetOrderHistoryProducts(cookies.loggedUser);
  const {data: shopCarts } = GetShopCarts();
  const {data: user, loading, error } = GetUser(id);

  function handleClick() {
    document.cookie = `loggedUser=${id}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/");
  }

  const order = (event) => {
        event.preventDefault();
        const foundShopCart = shopCarts.find((shopCart) => parseInt(shopCart.UserID) === parseInt(cookies.loggedUser));
  
        if(!foundShopCart) {
          const shopCartID = CreateShopCart(parseInt(cookies.loggedUser));
          CreateOrder(parseInt(shopCartID), null, null);
        } else {
          CreateOrder(parseInt(foundShopCart.ShopCartID), null, null);
        }
  }

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;
  

  return (
      <CardGroup>
      <Card>
          <Card.Header>{user.UserName}</Card.Header>
          <Card.Body>
            <br/>
            {user.UserFirstName}
            <br/>
            {user.UserLastName}
            <br/>
            {user.UserMail}
            <br/>
            {user.UserStreet}
            <br/>
            {user.UserZIP} {user.UserCity}
            <br/>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">
                  Daten Ändern
            </Button>
          </Card.Footer>
      </Card>
      <Card>
        <Card.Header>Bestell-Historie:</Card.Header>
        {
        products && products.length > 0 
        ? (products.map(( product ) => (
          <ListGroup className="list-group-flush">
            <Card.Body>
              <Card.Img src={product.ProductImageURL} alt={product.ProductName} />
              <Card.Text>
                Menge: {product.OrderQuantity} 
                <br/>
                Preis: {product.ProductPrice}€
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => order(product.OrderID, product.OrderQuantity)}>
                Nochmal bestellen
              </Button>
            </Card.Footer>
          </ListGroup>
        )))
      :(
        <Card.Body>
          <p>Bisher wurde noch nichts erworben.</p>
        </Card.Body>
      )}
        <Card.Footer>
            <Button variant="primary" onClick={() => handleClick()}>
              Logout
            </Button>
          </Card.Footer>
      </Card>
    </CardGroup>
  );
  }
  
  export default Account;