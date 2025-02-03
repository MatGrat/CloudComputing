const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5003;

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
  res.send('Welcome to the Order Service!');
});

// GET /orders
app.get('/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Orders');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});

// GET /orders/{id}
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM Orders WHERE OrderID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching order');
  }
});

// GET /orders/shopcart/{shopcartid}
app.get('/orders/shopcart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM Orders WHERE ShopCartID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching order');
  }
});

// POST /orders
app.post('/orders', async (req, res) => {
  const { ShopCartID, ProductID, OrderQuantity } = req.body;

  if (!ShopCartID || !ProductID|| !OrderQuantity) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `INSERT INTO Orders (ShopCartID, ProductID, OrderQuantity) VALUES (?, ?, ?)`,
      [ShopCartID, ProductID, OrderQuantity]
    );

    res.status(201).json(rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// PUT /orders/{id}
app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { ShopCartID, ProductID, OrderQuantity } = req.body; 
  
  if (!ShopCartID || !ProductID|| !OrderQuantity) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `UPDATE Orders SET ShopCartID = ?, ProductID = ?, OrderQuantity = ? WHERE OrderID = ?`,
      [ShopCartID, ProductID, OrderQuantity ,id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});

// DELETE /orders/{id}
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`DELETE FROM Orders WHERE OrderID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send('Order deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting order');
  }
});
  
app.listen(PORT, () => {
  console.log(`Order service running on http://localhost:${PORT}`);
});
  