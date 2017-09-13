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
        dbAlajuela.collection("Products").find({
            "name": prodName
        }).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == 'SJ') {
        console.log('retrieving data in alajuela');
        dbSanJose.collection("Products").find({
            "name": prodName
        }).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == "all") {
        var productsSJ;
        var productsAlajuela;
        dbSanJose.collection("Products").find({
            "name": prodName
        }).toArray(function(err, result) {
            if (err) throw err;
            productsSJ = result;
            dbAlajuela.collection("Products").find({
                "name": prodName
            }).toArray(function(err, result) {
                if (err) throw err;
                productsAlajuela = result;
                var total = productsSJ.concat(productsAlajuela);
                callback(total);
            });
        });
    } else {

    }

}

function retrieveOrders(idTienda, iniDate, endDate, callback) {
    console.log(iniDate);
    if (idTienda == 'Alajuela') {
        dbAlajuela.collection("Orders").find({
            "date": {
                $gte: new Date(iniDate),
                $lte: new Date(endDate)
            }
        }).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == 'SJ') {
        dbSanJose.collection("Orders").find({
            "date": {
                $gte: new Date(iniDate),
                $lte: new Date(endDate)
            }
        }).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == "Heredia") {
        dbHeredia.collection("Orders").find({
            "date": {
                $gte: new Date(iniDate),
                $lte: new Date(endDate)
            }
        }).toArray(function(err, result) {
            if (err) throw err;
            callback(result);
        });
    } else if (idTienda == "all") {
        var ordersSJ;
        var ordersAlajuela;
        dbSanJose.collection("Orders").find({
            "date": {
                $gte: new Date(iniDate),
                $lte: new Date(endDate)
            }
        }).toArray(function(err, result) {
            if (err) throw err;
            ordersSJ = result;
            dbAlajuela.collection("Orders").find({
                "date": {
                    $gte: new Date(iniDate),
                    $lte: new Date(endDate)
                }
            }).toArray(function(err, result) {
                if (err) throw err;
                ordersAlajuela = result;
                var total = ordersSJ.concat(ordersAlajuela);
                callback(total);
            });
        });
    } else {
        console.log("Failed");
    }

}

// ======== ROUTES ========

router.get('/report', function(req, res) {
    var reportInfo = req.query;
    console.log(reportInfo);
    var dateI = reportInfo.dateI;
    var dateF = reportInfo.dateF;
    var productName = reportInfo.product;
    var productStore = reportInfo.store;
    //console.log(productStore);
    data = retrieveOrders(productStore, dateI, dateF, function(data) {
        var orderArray = data;
        var totalSold = 0;
        for (var i = 0; i < orderArray.length; i++) {
            var products = orderArray[i].products;
            for (var j = 0; j < products.length; j++) {
                if (products[j].name == productName) {
                    totalSold += products[j].price;
                }
            }
        }
        res.json({
            "total": totalSold
        });
    });
})

module.exports = router;
