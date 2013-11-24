/* jshint laxcomma: true */

var express = require('express')
  , app = express()
  , path = require('path');

app.configure(function() {
  app.set('views', __dirname+'/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname+'/public'));
});

app.get('/', function(req, res) {
  res.render('index');
});


//\/\
module.exports = app;

