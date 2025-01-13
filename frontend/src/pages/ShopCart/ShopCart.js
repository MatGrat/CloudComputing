import Card from 'react-bootstrap/Card';
import { GetProduct } from '../../hooks/produkt-hook';
import { GetShopCart } from '../../hooks/shop-cart-hook';
import Button from 'react-bootstrap/Button';


function ShopCart() {
    
    return (
      <Card style={{ width: '18rem' }}>
      <Card.Header>{}</Card.Header>
        <Card.Body>
          <Card.Img/>
          <Card.Text>
            <p>
              Lieferbar in {} Werktagen.
            </p>
            <br/>
            <p>
              Bezahlen mit Bankverbindung: {}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" type="submit">
            Jetzt Bestellen!
          </Button>
        </Card.Footer>
      </Card>
    );
  }
  
  export default ShopCart;