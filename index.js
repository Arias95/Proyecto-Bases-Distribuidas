var express = require('express');
var app = express();

var mota = require('./src/test.js');
var driver = require('./src/driver.js');
var product = require('./src/products.js');
var orders = require('./src/orders.js');



app.use('/mota', mota);
app.use('/driver', driver);
app.use('/product', product);
app.use('/order', orders);



app.listen(3000);
