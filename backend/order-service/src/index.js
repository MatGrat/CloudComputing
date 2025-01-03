const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5003;

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
  res.send('Welcome to the Order Service!');
});

app.get('/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Orders');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});
  
app.listen(PORT, () => {
  console.log(`Order service running on http://localhost:${PORT}`);
});
  