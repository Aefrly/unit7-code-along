const sqlite3 = require('sqlite3').verbose();
const setup = require('./setup.js');

// Run setup first, then query
setup();

setTimeout(() => {
  const db = new sqlite3.Database('./database/inventory.db');
  db.all('SELECT * FROM products', (err, rows) => { 
    if (err) console.error(err);
    console.log(rows);
    db.close();
  });
}, 500);