require('dot-env');

var express = require('express');
var expressPromise = require('express-promise');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jira = require('./services/jira');
var fecru = require('./services/fecru');

if (!process.env.MONGO_URL) {
  console.log('Mongo URL is not set in env variables.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL);

var app = express();

app.set('env', process.env.ENV);
app.set('jira', jira(process.env.JIRA_URL, process.env.JIRA_USER, process.env.JIRA_PASSWORD, process.env.JIRA_API_VERSION));
app.set('fecru', fecru(process.env.FECRU_URL, process.env.JIRA_USER, process.env.JIRA_PASSWORD));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressPromise());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/jira', require('./routes/jira'));
app.use('/fecru', require('./routes/fecru'));

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
