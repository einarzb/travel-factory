//package and module requirements
var express = require('express');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var User = require("./models/userModel")
var port = process.env.PORT || 8000;

var app = express();
var db = mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/employees", {useMongoClient:true} ,function(err){
  if (err) throw err;
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(express.static('node_modules'));

//API routes
app.get('/', function(req, res, next){
  res.send('testing server')
});

//connectong DB to route
app.get('/travelfactory', function (req, res, next) {
    User.find(function (error, travelfactory) {
          if (error) {
            res.status(500).send({ error: err });
            console.log(error);
            return next(error);
          } else {
            res.send(travelfactory);
          }
     });
});

//add user
app.post('/travelfactory', function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(user);
    }
  });
});


//delete
app.delete('/travelfactory/:id', function(req, res, next){
  User.remove({_id: req.params.id},function(err){
    if(err){
      console.error(err);
      return next (err);
    }else{
    res.send("user deleted");
    }
  });
});

//update
app.put('/travelfactory/:id', function(req, res, next){
  User.find({_id: req.params.id}).exec(function(err, user){
  });
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec(function( err, user){ //pass 3 things: id, req.body, boolean and func
     if(err){
      console.error(err);
      return next (err);
    }else{
      res.send(user);
    }
  });
});

//404 error
app.use(function(req, res, next){
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


app.listen(port, function() {
  console.log("travel factory project. Listening now on " + port)
});
