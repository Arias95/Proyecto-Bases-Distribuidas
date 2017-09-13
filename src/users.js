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
    if (err) { return console.dir(err) }
    dbSanJose = db;
});

MongoClient.connect(driver.Alajuela, function(err, db) {
    if (err) { return console.dir(err) }
    dbAlajuela = db;
});

MongoClient.connect(driver.Heredia, function(err, db) {
    if (err) { return console.dir(err) }
    dbHeredia = db;
});

// ======== BODY PARSER INIT ========
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ======== ROUTES ========

// -------- ADMIN (USERS) --------

router.get('/', function(req, res) {
    var usersSJ;
    var usersAlajuela;
    dbSanJose.collection("Users").find().toArray(
        function(error, result) {
            usersSJ = result;
            dbAlajuela.collection("Users").find().toArray(
                function(error, result) {
                    usersAlajuela = result;
                    var total = usersSJ.concat(usersAlajuela);
                    res.json(total);
                }
            );
        }
    );
});


router.get('/:store', function(req, res) {
    var store = req.params.store;
    if (store == "SJ") {
        dbSanJose.collection("Users").find({"Store" : store}).toArray(
            function(error, result) {
                res.json(result);
            }
        );
    } else if (store == "Alajuela") {
        dbAlajuela.collection("Users").find({"Store" : store}).toArray(
            function(error, result) {
                res.json(result);
            }
        );
    } else {
        res.json([]);
    }
});

/*
Login function: Checks for the existence of a user with the details
given.
*/
router.post('/login', function(req, res) {
    var loginInfo = req.query;
    console.log(loginInfo);
    dbSanJose.collection("Users").find({"Name" : loginInfo.Name,
                                        "Password" : loginInfo.Password})
                                        .toArray(
        function(error, result) {
            if (result.length == 0) { // No user found with the details given.
                dbAlajuela.collection("Users").find({"Name" : loginInfo.Name,
                                                    "Password" : loginInfo.Password})
                                                    .toArray(
                    function(error, result) {
                        if (result.length == 0) { // No user found with the details given.
                            res.json({"Result" : 0});
                        } else { // User found, return success indicator.
                            res.json({"Result" : 1, "Name" : result[0].Name, "Store" : result[0].Store});
                        }
                    }
                );
            } else { // User found, return success indicator.
                res.json({"Result" : 1, "Name" : result[0].Name, "Store" : result[0].Store});
            }
        }
    );
});

/*
Register function: Stores a new user in a given database.
*/
router.post('/add', function(req, res) {
    var regInfo = req.query;
    console.log(regInfo)
    if (regInfo.Store == "SJ") {
        dbSanJose.collection("Users").insert(regInfo);
        res.json({"Success" : 1, "Name" : regInfo.Name, "Store" : regInfo.Store});
    } else if (regInfo.Store == "Alajuela") {
        dbAlajuela.collection("Users").insert(regInfo);
        res.json({"Success" : 1, "Name" : regInfo.Name, "Store" : regInfo.Store});
    } else {
        res.json({"Success" : 0, "Name" : regInfo.Name, "Store" : regInfo.Store});
    }
});

// -------- CLIENTS --------

router.get('/clients', function (req, res) {
    dbHeredia.collection("Users").find().toArray(
        function(error, result) {
            res.json(result);
        }
    );
});

router.post('/addClient', function(req, res) {
    var custInfo = req.query;
    console.log(custInfo);
    dbHeredia.collection("Clients").insert(custInfo);
    res.json({"Success" : 1});
});


module.exports = router;
