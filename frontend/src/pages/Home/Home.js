import { GetProducts } from '../../hooks/produkt-hook';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Home({ checked }) {
  const {data: products, loading, error } = GetProducts();

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;

  return (
    <Row xs={2} md={4} className="g-4" style={{backgroundColor: checked ? '#1d1d1d' : '#97c0ff'}}>
      {products.map((product) => (
        <Col key={product.ProductID}>
          <Link to={`/product/${product.ProductID}`} style={{ textDecoration: 'none' }}>
            <Card style={{ width: '18rem' }} className={checked ? styles['card-dark'] : styles['card-light']} onClick>
              <Card.Header className={checked ? styles['text-dark'] : styles['text-light']}>{product.ProductName}</Card.Header>
              <Card.Body>
                <Card.Img src={product.ProductImageURL}/>
              </Card.Body>
              <Card.Footer className={checked ? styles['text-dark'] : styles['text-light']}>{product.ProductPrice}€</Card.Footer>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default Home;