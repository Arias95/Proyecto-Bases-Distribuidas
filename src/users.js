var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var driver = require('./driver.js');
var bodyParser = require("body-parser");

// ======== DATABASE CONNECTIONS ========
var dbSanJose;
var dbAlajuela;

MongoClient.connect(driver.SanJose, function(err, db) {
    if (err) { return console.dir(err) }
    dbSanJose = db;
});

MongoClient.connect(driver.Alajuela, function(err, db) {
    if (err) { return console.dir(err) }
    dbAlajuela = db;
});

// ======== BODY PARSER INIT ========
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// ======== ROUTES ========
/*
Login function: Checks for the existence of a user with the details
given.
*/
router.post('/login', function(req, res) {
    var loginInfo = req.body;

    if (loginInfo.Store == "SJ") { // Checks inside the SJ database.
        dbSanJose.collection("Users").find({"Name" : loginInfo.Name,
                                            "Password" : loginInfo.Password,
                                            "Store" : loginInfo.Store})
                                            .toArray(
            function(error, result) { // No user found with the details given.
                if (result.length == 0) {
                    res.json({"Result" : 0});
                } else { // User found, return success indicator.
                    res.json({"Result" : 1});
                }
            }
        );
    } else if (loginInfo.Store == "Alajuela") { // Checks inside the Alajuela database.
        dbAlajuela.collection("Users").find({"Name" : loginInfo.Name,
                                            "Password" : loginInfo.Password,
                                            "Store" : loginInfo.Store})
                                            .toArray(
            function(error, result) {
                if (result.length == 0) { // No user found with the details given.
                    res.json({"Result" : 0});
                } else { // User found, return success indicator.
                    res.json({"Result" : 1});
                }
            }
        );
    } else { // The user is asking for a store that doesn't exists.
        res.json({"Result" : 0});
    }
});

/*
Register function: Stores a new user in a given database.
*/
router.post('/add', function(req, res) {
    var regInfo = req.body;

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

module.exports = router;
