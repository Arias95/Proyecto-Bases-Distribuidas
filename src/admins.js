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
router.post('/login', function(req, res) {
    var loginInfo = req.body;

    if (loginInfo.Store == "SJ") {
        dbSanJose.collection("Users").find({"Name" : loginInfo.Name,
                                            "Password" : loginInfo.Password,
                                            "Store" : loginInfo.Store})
                                            .toArray(
            function(error, result) {
                if (result.length == 0) {
                    res.json({"Result" : 0});
                } else {
                    res.json({"Result" : 1});
                }
            }
        );
    } else if (loginInfo.Store == "Alajuela") {
        dbAlajuela.collection("Users").find({"Name" : loginInfo.Name,
                                            "Password" : loginInfo.Password,
                                            "Store" : loginInfo.Store})
                                            .toArray(
            function(error, result) {
                if (result.length == 0) {
                    res.json({"Result" : 0});
                } else {
                    res.json({"Result" : 1});
                }
            }
        );
    } else {
        res.json({"Result" : 0});
    }
});

module.exports = router;
