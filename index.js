var express = require('express');
var app = express();

var mota = require('./src/test.js');
var driver = require('./src/driver.js');

app.use('/mota', mota);
app.use('/driver', driver);

app.listen(3000);
