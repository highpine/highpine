require('dot-env');

require('app-module-path').addPath('./server');

var express = require('express');
var expressPromise = require('express-promise');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var Auth = require('shared/auth');

/*
 * Setup Mongo connection.
 */
if (!process.env.MONGO_URL) {
    console.log('Mongo URL is not set in env variables.');
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URL);

/*
 * Create express app.
 */
var app = express();
app.set('env', process.env.ENV);

/*
 * Setup Session support.
 */
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
 * Setup application.
 */
app.use(favicon(path.join(__dirname, 'public', 'images', 'pine.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressPromise());

/**
 * Setup basic routes.
 */
app.use('/', require('routes/index'));
// todo: move to component?
app.use('/api', Auth.auth.authorizationChecker);

/*
 * Load and setup shared components
 */
var shared = [
    'api-proxy-manager',
    'data-services-manager',
    'jira',
    'fecru',
    'gitlab',
    'auth'
];
shared.forEach(function(componentName) {
    var component = require(path.join('shared', componentName));
    if (typeof component.setup === 'function') {
        component.setup(app, process.env);
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


module.exports = app;
