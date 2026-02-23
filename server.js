const express = require("express"); 
const sqlite3 = require("sqlite3").verbose(); 
const app = express(); 
const port = 3000; 

// Middleware 
app.use(express.json());

// Connect to database 
const db = new sqlite3.Database('./database/inventory.db');

// Get all products
app.get('/api/products', (reg, res) => { 
    db.all('SELECT * FROM products', (err, rows) => { 
        res.json(rows); 
    });
});

// GET single product
app.get('/api/products/:id', (req, res) => { 
    const id = req.params.id; 
    db.all('SELECT * FROM products WHERE id = ?', [id], (err, row) => { 
        res.json(row); 
    }); 
});

// POST new product 
app.post('/api/products', (req, res) => { 
    const { name, description, price, category, inStock } = req.body; 
    db.run(` 
        INSERT INTO products (name, description, price, category, inStock) 
        VALUES (?, ?, ?, ?, ?) 
        `, [name, description, price, category, inStock], 
        function(err) { 
            res.json({ id: this.lastID }); 
        }
    ); 
});

//Updating product information
app.put('/api/products/:id', (req, res) => { 
    const id = req.params.id; 
    const { name, description, price, category, inStock } = req.body; 
    db.run(` UPDATE products SET name = ?, description = ?, price = ?, category = ?, inStock = ? WHERE id = ? 
        `, [name, description, price, category, inStock, id], 
        function(err) { 
            res.json({ message: 'Product updated'
        }); 
        }
    ); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});