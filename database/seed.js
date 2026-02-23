db.all('SELECT * FROM products', (err, rows) => { 
    console.log(rows); 
});