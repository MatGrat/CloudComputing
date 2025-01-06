const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5006;

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
  res.send('Welcome to the User Service!');
});

// GET /users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// GET /users/{id}
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM Users WHERE UserID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user');
  }
});

// POST /users
app.post('/users', async (req, res) => {
  const { UserName, UserMail, UserFirstName, UserLastName, UserPassword, UserStreet, UserCity, UserZIP, UserIBAN } = req.body;

  if (!UserName || !UserMail || !UserFirstName || !UserLastName || !UserPassword || !UserStreet || !UserCity || !UserZIP || !UserIBAN) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `INSERT INTO Users (UserName, UserMail, UserFirstName, UserLastName, UserPassword, UserStreet, UserCity, UserZIP, UserIBAN) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [UserName, UserMail, UserFirstName, UserLastName, UserPassword, UserStreet, UserCity, UserZIP, UserIBAN]
    );

    res.status(201).json(rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

// PUT /users/{id}
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const {UserName, UserMail, UserFirstName, UserLastName, UserPassword, UserStreet, UserCity, UserZIP, UserIBAN } = req.body; 
  
  if (!UserName || !UserMail || !UserFirstName || !UserLastName || !UserPassword || !UserStreet || !UserCity || !UserZIP || !UserIBAN) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `UPDATE Users SET UserName = ?, UserMail = ?, UserFirstName = ?, UserLastName = ?, UserPassword = ?, UserStreet = ?, UserCity = ?, UserZIP = ?, UserIBAN = ? WHERE UserID = ?`,
      [UserName, UserMail, UserFirstName, UserLastName, UserPassword, UserStreet, UserCity, UserZIP, UserIBAN, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

// DELETE /users/{id}
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`DELETE FROM Users WHERE UserID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
});
  
app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`);
});
  