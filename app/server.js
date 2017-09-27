/**
 * Highpine backend web server.
 */
require('dot-env');
require('app-module-path').addPath('./server');

var path = require('path');

const EventEmitter = require('events');
class HighpineEventEmitter extends EventEmitter {}
const eventEmitter = new HighpineEventEmitter();

/*
 * Create express app.
 */
var express = require('express');
var app = express();
app.set('env', process.env.ENV);
app.set('eventEmitter', eventEmitter);

/*
 * Setup Mongo connection.
 */
if (!process.env.MONGO_URL) {
    console.log('Mongo URL is not set in env variables.');
    process.exit(1);
}
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

/*
 * Setup View engine.
 */
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

/*
 * Setup basic middleware.
 */
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressPromise = require('express-promise');
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressPromise());

/*
 * Setup Session support.
 */
var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));

/*
 * Setup Passport.
 */
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/**
 * Setup basic routes.
 */
app.use('/', require('routes/index'));

/*
 * Load and setup shared components.
 */
var shared = require('./server.shared-packages');
shared.forEach(function(componentName) {
    var component = require(path.join('shared', componentName));
    if (typeof component.setup === 'function') {
        component.setup(app, process.env);
    }
});

eventEmitter.emit('shared-components-setup');

/*
 * Handle errors.
 */

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
        var code = err.status || 500;
        if (err.syscall === 'getaddrinfo' && err.code === 'ENOTFOUND') {
            code = 502;
        }
        res.status(code);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var code = err.status || 500;
    if (err.syscall === 'getaddrinfo' && err.code === 'ENOTFOUND') {
        code = 502;
    }
    res.status(code);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;