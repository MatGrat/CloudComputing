import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { GetProduct } from '../../hooks/produkt-hook';
import { GetOrders } from '../../hooks/order-hook';
import React, { useState, useEffect } from 'react';

function ShopCart() {
  const { id } = useParams();
  const {data: orders } = GetOrders();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    console.log("Orders: ", orders)
    if (orders) {
      const products = orders
      .filter((order) => parseInt(order.ShopCartID) === parseInt(id))
      .map(async (order) => {
        const product = await GetProduct(order.ProductID);
        console.log("Product: ", product);
        console.log("Order: ", order);
        return {order, product};
      });

      Promise.all(products).then(setProduct);
    }
  }, [orders, id]);

  if (!product.length) {
    return <p>Keine Produkte im Warenkorb.</p>;
  }

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Header><h1>Warenkorb</h1></Card.Header>
        <Card.Body>
        {
          product.map(({ order, product }) => {

            if (!product) {
              return <p key={order.OrderID}>Lädt... </p>;
            }

            return (
              <Card key={order.OrderID} style={{ width: '18rem', marginBottom: '1rem' }}>
                <Card.Header>{product.ProductName}</Card.Header>
                <Card.Body>
                  <Card.Img src={product.ProductImageURL} alt={product.ProductName} />
                  <Card.Text>
                    Menge: {order.OrderQuantity}
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