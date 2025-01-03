const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5005;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const pool = mysql.createPool({
    host: 'hsdb', 
    user: 'root',
    password: 'rootpassword',
    database: 'hsdb',
  });

app.get('/', (req, res) => {
  res.send('Welcome to the ShopCart Service!');
});

app.get('/shopcarts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ShopCarts');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching shopcarts');
  }
});
  
app.listen(PORT, () => {
  console.log(`ShopCart service running on http://localhost:${PORT}`);
});
  