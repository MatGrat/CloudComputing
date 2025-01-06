import { useParams } from "react-router-dom";
import { GetProduct } from '../../hooks/produkt-hook';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import styles from './Product.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Account({ checked }) {
    const { id } = useParams();
    const {data: product, loading, error } = GetProduct(id);
    
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error}</p>;
    

    return (
        <CardGroup>
        <Card style={{ width: '18rem' }} className={checked ? styles['card-dark'] : styles['card-light']} onClick>
            <Card.Header className={checked ? styles['text-dark'] : styles['text-light']}>{product.ProductName}</Card.Header>
            <Card.Body>
                <Card.Img src={product.ProductImageURL}/>
            </Card.Body>
            <Card.Footer className={checked ? styles['text-dark'] : styles['text-light']}>{product.ProductPrice}€</Card.Footer>
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
            <Form>
                <Form.Group className="mb-3" controlId="formSelectValue">
                <Form.Select>
                  {Array.from({ length: product.ProductInventory }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                    Menge: {i + 1}
                  </option>
                  ))}
                </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Bestellen
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
  
  export default Account;