const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5006;

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
  res.send('Welcome to the User Service!');
});

app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});
  
app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`);
});
  