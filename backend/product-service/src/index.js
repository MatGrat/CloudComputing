const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 5000;

const pool = mysql.createPool({
    host: 'database', 
    user: 'root',
    password: 'rootpassword',
    database: 'homi_shoppi_db',
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Product Service!');
});

app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});
  
app.listen(PORT, () => {
  console.log(`Product service running on http://localhost:${PORT}`);
});
  