const sqlite3 = require('sqlite3').verbose();

module.exports = function setupDatabase() {
  // Create/connect to database file
  const db = new sqlite3.Database('./database/inventory.db');
  console.log('Connected to SQLite database');

  // Create products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      price REAL,
      category TEXT,
      inStock INTEGER
    )
  `, () => {
    console.log('Products table created');

    // Insert sample products
    db.run(`
      INSERT INTO products (name, description, price, category, inStock)
      VALUES 
        ('Wireless Headphones', 'Bluetooth headphones with noise cancellation', 89.99, 'Electronics', 25),
        ('Coffee Mug', 'Ceramic mug with company logo', 12.50, 'Office Supplies', 100),
        ('Laptop Stand', 'Adjustable aluminum laptop stand', 45.00, 'Electronics', 15),
        ('Notebook', 'Spiral-bound notebook with 200 pages', 8.99, 'Office Supplies', 50)
    `, () => {
      console.log('Sample data inserted');
      db.close();
    });
  });
}