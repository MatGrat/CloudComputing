const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); 

const app = express();
const PORT = 5004;

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
  res.send('Welcome to the Product Service!');
});

// GET /products
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Products');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

// GET /products/{id}
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await pool.query('SELECT * FROM Products WHERE ProductID = ?', [id]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

// POST /products
app.post('/products', async (req, res) => {
  const { ProductName, ProductDescription, ProductPrice, ProductImageURL } = req.body;

  if (!ProductName || !ProductDescription || !ProductPrice || !ProductImageURL) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL) VALUES (?, ?, ?, ?)`,
      [ProductName, ProductDescription, ProductPrice, ProductImageURL]
    );

    res.status(201).json({ message: "Product created successfully", ProductID: rows.insertId }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product');
  }
});

// PUT /products/{id}
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { ProductName, ProductDescription, ProductPrice, ProductImageURL } = req.body;
  
  if (!ProductName || !ProductDescription || !ProductPrice || !ProductImageURL) {
    return res.status(400).send('Missing fields');
  }

  try {
    const [rows] = await pool.query(
      `UPDATE Products SET ProductName = ?, ProductDescription = ?, ProductPrice = ?, ProductImageURL = ? WHERE ProductID = ?`,
      [ProductName, ProductDescription, ProductPrice, ProductImageURL, id]
    );
    if (rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.status(200).json({ message: "Product updated successfully", ProductID: rows.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating product');
  }
});

// DELETE /products/{id}
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`DELETE FROM Products WHERE ProductID = ?`, [id]);
    if (rows.length === 0) {
      return res.status(404).send('products not found');
    }
    res.status(200).send('product deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product');
  }
});
  
app.listen(PORT, () => {
  console.log(`Product service running on http://localhost:${PORT}`);
});
  