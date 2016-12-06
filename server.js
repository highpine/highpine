/**
 * Highpine backend web server.
 */
require('dot-env');
require('app-module-path').addPath('./server');

var path = require('path');

/*
 * Create express app.
 */
var express = require('express');
var app = express();
app.set('env', process.env.ENV);

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
 * Setup Session support.
 */
var session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));

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
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    credentials: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressPromise());

/**
 * Setup basic routes.
 */
app.use('/', require('routes/index'));

/*
 * Load and setup shared components.
 */
var shared = [
    'api-proxy-manager',
    'data-services-manager',
    'jira',
    'fecru',
    'gitlab',
    'auth',
    'api',
    'person',
    'project'
];
shared.forEach(function(componentName) {
    var component = require(path.join('shared', componentName));
    if (typeof component.setup === 'function') {
        component.setup(app, process.env);
    }
});

// todo: trigger 'components-setup' event
// catch API error
let isDevMode = app.get('env') === 'development';
app.use(function(err, req, res, next) {
    if (err instanceof Error) {
        if (err.name == 'ValidationError') {
            err.status = 400;
        }
        res.statusCode = err.status || 500;
        if (res.statusCode >= 400 && res.statusCode < 500) {
            res.json({
                message: err.message
            });
        } else if (res.statusCode >= 500 && res.statusCode < 600) {
            res.json({
                message: isDevMode ? 'Server error: ' + err : 'Server error'
            });
            console.warn('Internal error(%d): %s', res.statusCode, err.message);
        }
    } else {
        next();
    }
});

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
if (isDevMode) {
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
