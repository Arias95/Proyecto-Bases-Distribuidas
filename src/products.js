
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var dbAdminA;
var dbAdminSJ;

MongoClient.connect('mongodb://192.168.100.5:8050/Alajuela', function(err, db) {
  if(err) { return console.dir(err); }
  dbAdminA=db;
});

MongoClient.connect('mongodb://192.168.100.5:8051/SJ', function(err, db) {
  if(err) { return console.dir(err); }
  dbAdminSJ=db;
});

/*var productSchema = mongoose.Schema({
    nombre : String,
    tienda : String,
    precio: Number
}, {  collection:'Products' }   );
var Product = connAlajuela.model("productSchema", productSchema);*/

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/newProduct', function (req, res) {
  newProduct = req.body;

  if (newProduct.tienda=='alajuela'){
    console.log("inserting in alajuela")
    var collection = dbAdminA.collection('Products');
    collection.insert(newProduct);
    res.send("insertado!");
  }
  else {
    var collection = dbAdminSJ.collection('Products');
    collection.insert(newProduct);
    console.log("inserting in sj")
    res.send("insertado!");
  }
   /*
   Falta almacenar en Heredia
   */


});

function retrieveData(idTienda,callback){
  if (idTienda=='alajuela'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminA.collection("Products").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(result);

  });

  }

  else if( idTienda=='sj'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminSJ.collection("Products").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(result);
    });
 }

  else {

  }

}

router.get('/AllProducts/:id', function (req, res) {
  idStore=req.params.id;
  console.log('verif idStore: ' + idStore );
  data=retrieveData(idStore, function(data){
    response ={};
    response.data = data;
    res.json(response);

    });
});












module.exports = router;
