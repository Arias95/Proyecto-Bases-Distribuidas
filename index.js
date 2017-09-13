var express = require('express');
var app = express();
var mota = require('./src/test.js');
var driver = require('./src/driver.js');
var users = require('./src/users.js');

app.use('/mota', mota);
app.use('/users', users);

app.listen(3000, function() {
    console.log("Server corriendo en puerto 3000");
});
