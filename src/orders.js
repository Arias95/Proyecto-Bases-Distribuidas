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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/newOrder', function (req, res) {
  newOrder = req.body;
  console.log(req);
  //res.send("prueba")
  if (newOrder.store=='Alajuela'){
    console.log("inserting in alajuela")
    var collection = dbAdminA.collection('Orders');
    collection.insert(newOrder);
    res.send("insertado!");
  }
  else if( newOrder.store=='SJ'  )  {
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
  if (idStore=='Alajuela'){
    console.log('retrieving data in alajuela');
    var data;
    dbAdminA.collection("Orders").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

    callback(result);

  });
}

  else if( idStore=='SJ'){
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

function callbackCollectionByDate(users,pDb,callback){
  var resultQuery=[];
  for(i=0;i <users.length;i++ ){
    console.log('in user: ' + users[i].Name );

    pDb.collection("Orders").find( {"client" :{"name": users[i].Name  } ,
    "date":{ $gte: dateI, $lte: dateF  } }).toArray(function(err, result)   {
    if (err) throw err;
    console.log(result)
    var total=0;
    for (j=0;j<result.length;j++){
      total+=result[j].total;
    }
    var resultToInsert= {name: "", "cantOrders":result.length, "orders":result,"total":total }
    resultQuery.push(resultToInsert);
    } );

  }
  console.log("returningquery!");
  return callback(resultQuery);
}



function getCantOrdersbyDate(idStore, dateI, dateF, users  ,callback){

  if (idStore=='Alajuela'){
    console.log("in Alajuela")
    var finalArry=[];
     callbackCollectionByDate(users,dbAdminA,function(result){
       setTimeout(function(){
       finalArry=result;
       for(i=0; i<finalArry.length;i++){
         finalArry[i].name=users[i].Name;
       }
       callback(finalArry)
   }, 1000);
     });
     setTimeout(function(){

      }, 2000);

  }


  else if( idStore=='SJ'){
    var finalArry=[];
     callbackCollectionByDate(users,dbAdminSJ,function(result){
       setTimeout(function(){
       finalArry=result;
       for(i=0; i<finalArry.length;i++){
         finalArry[i].name=users[i].Name;
       }
       callback(finalArry)
   }, 1000);
    });
    setTimeout(function(){

     }, 2000);
 }
  else {


  }


}


function getUsers(idStore,callback){
  if(idStore=='Alajuela'){

    dbAdminA.collection("Users").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    callback(result);

  });
  }
  else if(idStore=='SJ'){
    dbAdminA.collection("Users").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
    callback(result);

  });

  }
  else{

  }

}

router.get('/getOrder/:idStore', function (req, res) {
  idStore=req.params.idStore;
  dateI=req.body.dateI;
  dateF=req.body.dateF;
  name = req.body.name;
  console.log("dateI"+ dateI);

  console.log("dateF"+ dateF);
  var users;
  getUsers(idStore, function(users) {

    data=getCantOrdersbyDate(idStore , dateI, dateF ,users, function(data){
    response ={};
    response.data = data;
    res.json(response);

    });

  });



});



router.get('/AllOrders/:id', function (req, res) {
  idStore=req.params.id;
  console.log('verif idStore: ' + idStore );
  data=retrieveData(idStore, function(data){
  response ={};
  response.data = data;
  res.json(response);

    });
});

router.get('/prueba', function (req, res) {

  dbAdminA.collection("Orders").find( {"client" :{"name": "Aaron Elizondo"  } ,
  "date":{ $gte: "03/21/2017", $lte:  "03/30/2017" } } ).toArray(function(err, result)   {
  if (err) throw err;
  console.log(result );
  } );

  res.json("asdas");


});


function retrieveAllMoney(idStore,callback){

  if (idStore=='Alajuela'){
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

  else if( idStore=='SJ'){
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
