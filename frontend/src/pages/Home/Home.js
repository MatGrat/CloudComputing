import { GetProducts } from '../../hooks/produkt-hook';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  const {data: products, loading, error } = GetProducts();

  if(loading) return <p>Lädt...</p>;
  if(error) return <p>Error: {error}</p>;

  return (
    <div className={styles['home-container']}>
      <Row xs={2} md={4} className="g-4">
        {products.map((product) => (
          <Col key={product.ProductID}>
            <Link to={`/product/${product.ProductID}`} style={{ textDecoration: 'none' }}>
              <Card style={{ width: '18rem' }} className={styles['card-light']}>
                <Card.Header className={styles['text-light']}>{product.ProductName}</Card.Header>
                <Card.Body>
                  <Card.Img src={product.ProductImageURL}/>
                </Card.Body>
                <Card.Footer className={styles['text-light']}>{product.ProductPrice}€</Card.Footer>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;