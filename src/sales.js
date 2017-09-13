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

// ======== ROUTES ========

/*
function getProducts(res) {
    console.log("Test2");
    dbAlajuela.collection("Products").find({}).toArray({
        function(error, result) {
            console.log("test4");
            getProductsAux(error);
        }
    });
}
function getProductsAux(res, Salida) {
    console.log("Test3");
    res.json(Salida);
}

router.get('/products', function(req, res) {
    getProducts(res);
});
*/


function retrieveData(idTienda, callback) {
    if (idTienda == 'Alajuela') {
        console.log('retrieving data in alajuela');
        dbAlajuela.collection("Products").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            callback(result);
        });
    } else if (idTienda == 'SJ') {
        console.log('retrieving data in alajuela');
        dbSanJose.collection("Products").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            callback(result);
        });
    } else if (idTienda == "all") {
        var productsSJ;
        var productsAlajuela;
        dbSanJose.collection("Products").find({}).toArray(function(err, result) {
            if (err) throw err;
            productsSJ = result;
            dbAlajuela.collection("Products").find({}).toArray(function(err, result) {
                if (err) throw err;
                productsAlajuela = result;
                var total = productsSJ.concat(productsAlajuela);
                console.log(total);
                callback(total);
            });
        });
    } else {

    }

}

router.get('/products/', function(req, res) {
    data = retrieveData("all", function(data) {
        response = {};
        response.data = data;
        res.json(response);

    });
});

module.exports = router;
