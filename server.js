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