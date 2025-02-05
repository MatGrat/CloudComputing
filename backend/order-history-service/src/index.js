const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5007;

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
  res.send('Welcome to the Order History Service!');
});

// GET /orderhistorys
app.get('/orderhistorys', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OrderHistorys');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching orderHistory');
  }
});

// GET /orderhistorys/{id}
app.get('/orderhistorys/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM OrderHistorys WHERE OrderHistoryID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('OrderHistory not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching orderHistory');
  }
});

// GET /orderhistorys/products/{userid}
app.get('/orderhistorys/products/:id', async (req, res) => {
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
      JOIN OrderHistorys oh ON u.UserID = oh.UserID
      JOIN Orders o ON oh.OrderHistoryID = o.OrderHistoryID
      JOIN Products p ON o.ProductID = p.ProductID 
      WHERE u.UserID = ?`
      , [id]);
      if (rows.length === 0) {
        return res.status(404).send('No products, no orderhistory or no user with the same ID!');
      }
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching shopcart');
    }
  });

// POST /orderhistorys
app.post('/orderhistorys', async (req, res) => {
  const { UserID } = req.body;

  if (!UserID) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `INSERT INTO OrderHistorys (UserID) VALUES (?)`,
      [UserID]
    );

    res.status(201).json(rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating orderHistory');
  }
});

// PUT /orderhistorys/{id}
app.put('/orderhistorys/:id', async (req, res) => {
  const { id } = req.params;
  const { UserID } = req.body; 
  
  if (!UserID) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `UPDATE OrderHistorys SET UserID = ? WHERE OrderHistoryID = ?`,
      [UserID, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('OrderHistory not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating orderHistory');
  }
});

// DELETE /orderhistorys/{id}
app.delete('/orderhistorys/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`DELETE FROM OrderHistorys WHERE OrderHistoryID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('OrderHistory not found');
    }
    res.status(200).send('OrderHistory deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting orderHistory');
  }
});
  
app.listen(PORT, () => {
  console.log(`OrderHistory service running on http://localhost:${PORT}`);
});
  