const sqlite3 = require('sqlite3').verbose();

// Create/connect to database file
const db = new sqlite3.Database('./database/inventory.db');
console.log('Connected to SQLite database');

// Create products table
db.run(`
  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    inStock INTEGER
  )
`);

console.log('Products table created');