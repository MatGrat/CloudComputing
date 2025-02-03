import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { GetShopCartProducts } from '../../hooks/shop-cart-hook';

function ShopCart() {
  const { userID } = useParams();
  const {data: products } = GetShopCartProducts(3);

  if (!products) {
    return <p>Keine Produkte im Warenkorb.</p>;
  }

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Header><h1>Warenkorb</h1></Card.Header>
        <Card.Body>
        {
          
          products.map(( product ) => {
         
            if (!product) {
              return <p>Lädt... </p>;
            }

            return (
              <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                <Card.Header>{product.ProductName}</Card.Header>
                <Card.Body>
                  <Card.Img src={product.ProductImageURL} alt={product.ProductName} />
                  <Card.Text>
                    Menge: {product.OrderQuantity}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>{product.ProductPrice}€</Card.Footer>
              </Card>
            );
          })
        }
        </Card.Body>
      </Card>
    );
}
  
export default ShopCart;