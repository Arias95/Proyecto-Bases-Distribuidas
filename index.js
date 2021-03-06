var express = require('express');
var app = express();
var mota = require('./src/test.js');
var driver = require('./src/driver.js');
var users = require('./src/users.js');
var sales = require('./src/sales.js');
var product = require('./src/products.js');
var orders = require('./src/orders.js');

app.use('/product', product);
app.use('/order', orders);
app.use('/users', users);
app.use('/sales', sales);

app.listen(3000, function() {
    console.log("Server corriendo en puerto 3000");
});
