const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5005;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());

const pool = mysql.createPool({
    host: 'hsdb', 
    user: 'root',
    password: 'rootpassword',
    database: 'hsdb',
  });

  // GET /
app.get('/', (req, res) => {
  res.send('Welcome to the ShopCart Service!');
});

// GET /shopcarts
app.get('/shopcarts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ShopCarts');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching shopcarts');
  }
});

// GET /shopcarts/{id}
app.get('/shopcarts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM ShopCarts WHERE ShopCartID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Shopcart not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching shopcart');
  }
});

// GET /shopcarts/products/{userid}
app.get('/shopcarts/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
    `SELECT
    o.OrderID, 
    o.OrderQuantity,
    p.ProductID, 
    p.ProductName, 
    p.ProductDescription, 
    p.ProductPrice, 
    p.ProductImageURL, 
    p.ProductInventory, 
    p.ProductDeliveryDays 
    FROM Users u
    JOIN ShopCarts sc ON u.UserID = sc.UserID
    JOIN Orders o ON sc.ShopCartID = o.ShopCartID
    JOIN Products p ON o.ProductID = p.ProductID 
    WHERE u.UserID = ?`
    , [id]);
    if (rows.length === 0) {
      return res.status(404).send('No products, no shopcard oder no user with the same ID!');
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching shopcart');
  }
});

// POST /shopcarts
app.post('/shopcarts', async (req, res) => {
  const { UserID } = req.body;

  console.log(UserID);

  if (!UserID) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `INSERT INTO ShopCarts (UserID) VALUES (?)`,
      [UserID]
    );

    res.status(201).json(rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating shopcart');
  }
});

// PUT /shopcarts/{id}
app.put('/shopcarts/:id', async (req, res) => {
  const { id } = req.params;
  const { UserID } = req.body; 
  
  if (!UserID) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `UPDATE ShopCarts SET UserID = ? WHERE ShopCartID = ?`,
      [UserID, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Shopcart not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating shopcart');
  }
});

// DELETE /shopcarts/{id}
app.delete('/shopcarts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`DELETE FROM ShopCarts WHERE ShopCartID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Shopcart not found');
    }
    res.status(200).send('Shopcart deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting shopcart');
  }
});
  
app.listen(PORT, () => {
  console.log(`ShopCart service running on http://localhost:${PORT}`);
});
  