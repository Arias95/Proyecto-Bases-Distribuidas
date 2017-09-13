var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var driver = require('./driver.js');
var bodyParser = require("body-parser");

// ======== DATABASE CONNECTIONS ========
var dbSanJose;
var dbAlajuela;
var dbHeredia;

MongoClient.connect(driver.SanJose, function(err, db) {
    if (err) {
        return console.dir(err)
    }
    dbSanJose = db;
});

MongoClient.connect(driver.Alajuela, function(err, db) {
    if (err) {
        return console.dir(err)
    }
    dbAlajuela = db;
});

MongoClient.connect(driver.Heredia, function(err, db) {
    if (err) {
        return console.dir(err)
    }
    dbHeredia = db;
});

// ======== BODY PARSER INIT ========
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

// ======== CALLBACK FUNCTIONS ========

function retrieveProducts(idTienda, prodName, callback) {
    if (idTienda == 'Alajuela') {
        console.log('retrieving data in alajuela');
        dbAlajuela.collection("Products").find({"name" : prodName}).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == 'SJ') {
        console.log('retrieving data in alajuela');
        dbSanJose.collection("Products").find({"name" : prodName}).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == "all") {
        var productsSJ;
        var productsAlajuela;
        dbSanJose.collection("Products").find({"name" : prodName}).toArray(function(err, result) {
            if (err) throw err;
            productsSJ = result;
            dbAlajuela.collection("Products").find({"name" : prodName}).toArray(function(err, result) {
                if (err) throw err;
                productsAlajuela = result;
                var total = productsSJ.concat(productsAlajuela);
                callback(total);
            });
        });
    } else {

    }

}

function retrieveOrders(idTienda, callback) {
    if (idTienda == 'Alajuela') {
        dbAlajuela.collection("Orders").find({}).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == 'SJ') {
        dbSanJose.collection("Orders").find({}).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == "all") {
        var ordersSJ;
        var ordersAlajuela;
        dbSanJose.collection("Orders").find({}).toArray(function(err, result) {
            if (err) throw err;
            ordersSJ = result;
            dbAlajuela.collection("Orders").find({}).toArray(function(err, result) {
                if (err) throw err;
                ordersAlajuela = result;
                var total = ordersSJ.concat(ordersAlajuela);
                callback(total);
            });
        });
    } else {

    }

}

function byProductCallback(productName, callback) {
    products = retrieveProducts("all", function(products) {

    });
}

// ======== ROUTES ========

/*router.get('/products/', function(req, res) {
    data = retrieveProducts("all", function(data) {
        response = {};
        response.data = data;
        res.json(response);

    });
});

router.get('/orders/', function(req, res) {
    data = retrieveOrders("all", function(data) {
        response = {};
        response.data = data;
        res.json(response);

    });
});*/

router.get('/report/:product', function(req, res) {
    var productName = req.params.product;
    data = retrieveOrders("all", function(data) {
        var orderArray = data;
        var totalSold = 0;
        for (var i = 0 ; i < orderArray.length ; i++) {
            var products = orderArray[i].products;
            for (var j = 0 ; j < products.length ; j++) {
                console.log(products[j]);
                if (products[j].name == productName) {
                    totalSold += products[j].price;
                    console.log(totalSold);
                }
            }
        }
        res.json({"total" : totalSold});
    });
})

module.exports = router;
