/**
 * Highpine client simple static web server.
 */
require('dot-env');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

/*
 * Create express app.
 */
var app = express();
app.set('env', process.env.ENV);

/*
 * Setup View engine.
 */
app.set('views', path.join(__dirname, 'client', 'views'));
app.set('view engine', 'pug');

/*
 * Setup application.
 */
app.use(favicon(path.join(
    __dirname, 'public', 'media', 'dl-tools', 'components', 'app', 'images', 'pine.ico'
)));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

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
