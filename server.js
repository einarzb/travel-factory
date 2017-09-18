//package and module requirements
var express = require('express');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var Contact = require("./models/contactModel")
var port = process.env.PORT || 8000;

var app = express();

mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/travelfactory" , function(err){
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
    Contact.find(function (error, travelfactory) {
          if (error) {
            res.status(500).send({ error: err });
            console.log(error);
            return next(error);
          } else {
            res.send(travelfactory);
          }
     });
});

//add Contact
app.post('/travelfactory', function(req, res, next) {
  Contact.create(req.body, function(err, Contact) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(Contact);
    }
  });
});


//delete
app.delete('/travelfactory/:id', function(req, res, next){
  Contact.remove({_id: req.params.id},function(err){
    if(err){
      console.error(err);
      return next (err);
    }else{
    res.send("Contact deleted");
    }
  });
});

//update
app.put('/travelfactory/:id', function(req, res, next){
  Contact.find({_id: req.params.id}).exec(function(err, Contact){
  });
  Contact.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec(function( err, Contact){ //pass 3 things: id, req.body, boolean and func
     if(err){
      console.error(err);
      return next (err);
    }else{
      res.send(Contact);
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
