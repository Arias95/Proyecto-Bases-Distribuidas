var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://192.168.100.5:8050/Alajuela');

var personSchema = mongoose.Schema({
    name : String,
    age: Number
});

var Person = mongoose.model("Person", personSchema);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/test', function (req, res) {
    var personInfo = req.body;
    if (!personInfo.name || !personInfo.age) {
        res.send("Error: faltaron datos");
    } else {
        var newPerson = new Person({
            name : personInfo.name,
            age : personInfo.age
        });

        newPerson.save(function(err, Person) {
            if (err) {
                res.send("Error insertando en base");
            } else {
                res.send("Insercion realizada con exito");
            }
        });
    }
});

module.exports = router;
