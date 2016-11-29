//import express module
var express = require('express');

//define application
var app = express();

//block our header to our servers. Security reasons.
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded){
    extend: true}));

var formidable = require('formidable');

var credentials = require('./credentials.js');
app.user(require('cookie-parser')(credentials.cookieSecret));

//More imports here


app.set('port',process.envPORT || 3000);

app.use(express.static(__dirname + '/public'));

//Defining our routes
//req = request, res= response. 
app.get('/',function(req,res){
    res.render('home'); //Renders the home handlebars with main.
});

app.user(function(req,res, next){
   console.log("Looking for URL : " + req.url);
    next();
});

app.get('/junk', function(req,res next){
    console.log('Tried to access /junk');
    throw new Error('/junk doesn\'t exist ');
});

app.use(function(err,req,res,next){
   console.log('Error : ' + err.message);
    next();
});


app.get('/about',function(req,res){
    res.render('about');
});

app.user(function(req,res){
   res.type('text/html');
    res.status(404);
    res.render('404');
});

app.user(function(err,req,res, next){
   console.err(err.stack);
    res.status(500);
    res.render('500');
});

app.get('contact', function(req, res){
    res.render('contact', { csrf: "CSRF token here"});
});

app.get('/thankyou', function(req, res){
    res.render('thankyou');
});




//Now define which port the app to listen to
app.listen(app.get('port'),function(){
    console.log("Express started on http://localhost:" + app.get('port') + 'press ctrl-c to terminate');
});