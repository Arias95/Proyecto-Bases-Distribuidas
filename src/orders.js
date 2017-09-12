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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/newOrder', function (req, res) {
  newOrder = req.body;
  console.log(newOrder);
  //res.send("prueba")
  if (newOrder.tienda=='alajuela'){
    console.log("inserting in alajuela")
    var collection = dbAdminA.collection('Orders');
    collection.insert(newOrder);
    res.send("insertado!");
  }
  else {
    var collection = dbAdminSJ.collection('Orders');
    collection.insert(newOrder);
    console.log("inserting in sj")
    res.send("insertado!");
  }
   /*
   Falta almacenar en Heredia
   */
});




function retrieveData(idStore,callback){
  if (idStore=='alajuela'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminA.collection("Orders").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(result);

  });
}

  else if( idStore=='sj'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminSJ.collection("Orders").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    callback(result);
    });
 }

  else {

  }

}



router.get('/AllOrders/:id', function (req, res) {
  idStore=req.params.id;
  console.log('verif idStore: ' + idStore );
  data=retrieveData(idStore, function(data){
  response ={};
  response.data = data;
  res.json(response);

    });
});


function retrieveAllMoney(idStore,callback){

  if (idStore=='alajuela'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminA.collection("Orders").aggregate([ {
    $group: {
        _id: null,
        total: {
            $sum: "$total"
        }
    }
} ] ,  function(err,result) {
    if (err) throw err;
    console.log(result);
    callback(result);

  });
}

  else if( idStore=='sj'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminSJ.collection("Orders").aggregate([ {
    $group: {
        _id: null,
        total: {
            $sum: "$total"
        }
    }
} ] ,  function(err,result) {
    if (err) throw err;
    console.log(result);
    callback(result);

  });
}

  else {

  }

}


router.get('/money/:id', function (req, res) {
  idStore=req.params.id;
  console.log('verif idStore: ' + idStore );
  data=retrieveAllMoney(idStore, function(data){
  response ={};
  response.data = data;
  res.json(response);

    });
});






module.exports = router;