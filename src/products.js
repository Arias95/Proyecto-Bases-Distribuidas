
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var dbAdminA;
var dbAdminSJ;


MongoClient.connect('mongodb://192.168.100.6:8050/Alajuela', function(err, db) {
  if(err) { return console.dir(err); }
  dbAdminA=db;
});

MongoClient.connect('mongodb://192.168.100.6:8051/SJ', function(err, db) {
  if(err) { return console.dir(err); }
  dbAdminSJ=db;
});

MongoClient.connect('mongodb://192.168.100.6:8051/Heredia', function(err, db) {
  if(err) { return console.dir(err); }
  dbAdminH=db;
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
  newProduct = req.query;
  console.log("query!"+req.query.store)
  if (newProduct.store=='Alajuela'){
    console.log("inserting in alajuela")
    var collection = dbAdminA.collection('Products');
    collection.insert(newProduct);

    res.send("insertado!");
  }
  else if (newProduct.store=='SJ'){
    var collection = dbAdminSJ.collection('Products');
    collection.insert(newProduct);
    console.log("inserting in sj")
    res.send("insertado!");
  }
  else {
    var collection = dbAdminH.collection('Products');
    collection.insert(newProduct);
    console.log("inserting in sj")
    res.send("insertado!");

  }
   /*
   Falta almacenar en Heredia
   */


});

function retrieveData(idTienda,callback){
  if (idTienda=='Alajuela'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminA.collection("Products").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(result);

  });
  }
  else if( idTienda=='SJ'){
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
