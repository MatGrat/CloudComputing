import Card from 'react-bootstrap/Card';
import { GetShopCartProducts } from '../../hooks/shop-cart-hook';
import { GetOrderHistorys } from '../../hooks/order-history-hook';
import { DeleteOrder, UpdateOrder } from '../../hooks/order-hook';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function ShopCart() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  const {data: products } = GetShopCartProducts(cookies.loggedUser);
  const {data: orderHistorys } = GetOrderHistorys();

  if (!products) {
    return <p>Keine Produkte im Warenkorb.</p>;
  }

  var foundOrderHistory = null;
  if(orderHistorys != null) {
    foundOrderHistory = orderHistorys.find((orderHistory) => parseInt(orderHistory.UserID) === parseInt(cookies.loggedUser));
  } 

  const MoveOrdersToHistory = async () => {
    await Promise.all(
      products.map(async (product) => {
      await UpdateOrder(product.OrderID, null, foundOrderHistory.OrderHistoryID, product.ProductID, product.OrderQuantity);
      })
    );
  };


    return (
      <Card style={{ width: '18rem' }}>
      <Card.Header><h1>Warenkorb</h1></Card.Header>
        {products.map(( product ) => (
          <ListGroup className="list-group-flush">
          <Card.Header>{product.ProductName}</Card.Header>
              <Card.Body>
                <Card.Img src={product.ProductImageURL} alt={product.ProductName} />
                <Card.Text>
                  Menge: {product.OrderQuantity} 
                  <br/>
                  Preis: {product.ProductPrice}€
                </Card.Text>
              </Card.Body>
            <Card.Footer>
            <Button onClick={() => DeleteOrder(product.OrderID)}>
              Löschen
          </Button>
            </Card.Footer>
          </ListGroup>
        ))}
        <Card.Footer>
          <Button onClick={() => MoveOrdersToHistory()}>
            Jetzt bestellen!
          </Button>
        </Card.Footer>
      </Card>
    );
}
  
export default ShopCart;