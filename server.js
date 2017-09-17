//package and module requirements
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require("./models/userModel")
var port = process.env.PORT || 8000

var app = express();

var promise = mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/employees", function(err){
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
app.get('/employees', function (req, res, next) {
    User.find(function (error, users) {
          if (error) {
            console.error(error)
            return next(error);
          } else {
            res.send(users);
            console.log(users);
          }
     });
});

//add user
app.post('/employees', function(req, res, next) {
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
app.delete('/employees/:id', function(req, res, next){
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
app.put('/employees/:id', function(req, res, next){
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


server.listen(port, function() {
  console.log("travel factory project. Listening on " + port)
});
