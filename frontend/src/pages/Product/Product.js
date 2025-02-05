import { useParams } from "react-router-dom";
import { GetProduct } from '../../hooks/produkt-hook';
import { CreateOrder } from '../../hooks/order-hook';
import { GetShopCarts, CreateShopCart } from '../../hooks/shop-cart-hook';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import styles from './Product.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Product() {
    const { id } = useParams();
    const {data: product, loading, error } = GetProduct(id);
    const {data: shopCarts } = GetShopCarts();
    
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const foundShopCart = shopCarts.find((shopCart) => parseInt(shopCart.UserID) === parseInt(cookies.loggedUser));

      console.log(foundShopCart);

      if(!foundShopCart) {
        const shopCartID = await CreateShopCart(parseInt(cookies.loggedUser));
        await CreateOrder(parseInt(shopCartID.ShopCartID), null, parseInt(product.ProductID), parseInt(formData.get('productValue')));
      } else {
        await CreateOrder(parseInt(foundShopCart.ShopCartID), null, parseInt(product.ProductID), parseInt(formData.get('productValue')));
      }
    }

    return (
        <CardGroup>
        <Card style={{ width: '18rem' }} className={styles['card-light']} onClick>
            <Card.Header className={styles['text-light']}>{product.ProductName}</Card.Header>
            <Card.Body>
                <Card.Img src={product.ProductImageURL}/>
            </Card.Body>
            <Card.Footer className={styles['text-light']}>{product.ProductPrice}€</Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Produkt-Details</Card.Title>
            <Card.Text>
              {product.ProductName}
              <p/>
              Lieferbar in {product.ProductDeliveryDays} Werktagen.
              <p/>
              {product.ProductDescription}
            </Card.Text>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Select controlId="productValue" name="productValue">
                  {Array.from({ length: product.ProductInventory }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                    Menge: {i + 1}
                  </option>
                  ))}
                </Form.Select >
                </Form.Group>
                <Button variant="primary" type="submit">
                    In den ShopWagen
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
  
  export default Product;