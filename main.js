var express = require('express');

var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/users');

var cons = require('consolidate') // Templating library adapter for Express
app.use(express.static('public'));

MongoClient.connect('mongodb://jimsward:polello1@ds045757.mongolab.com:45757/checking', function(err, db) {
   
    if(err) throw err;

var entries = db.collection("entries");

entries.ensureIndex({date:1}, { w:0 })

// view engine setup
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.locals.cache = "memory"
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Application routes
    routes(app, db);



//app.use('/', routes);
//app.get('/', contentHandler.displayMainPage);


//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

 
/*app.listen(3000);
    console.log('Express server listening on port 3000');
	
*/})

module.exports = app;
