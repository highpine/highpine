require('dot-env');

var express = require('express');
var expressPromise = require('express-promise');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jiraProxy = require('node-jira-api-proxy');
var session = require('express-session');
var auth = require('./server/services/auth');


if (!process.env.MONGO_URL) {
    console.log('Mongo URL is not set in env variables.');
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URL);

var app = express();
app.set('env', process.env.ENV);
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'l;searopxjnweioprcnjio;awwej;cxrz'
}));

jiraProxy.JiraApiProxyConfig.strictSSL = false;
app.set('jira-proxy', new jiraProxy.JiraApiProxyRegistry(process.env.JIRA_URL, '/api/jira/proxy'));
//app.set('jira', jira(process.env.JIRA_URL, process.env.JIRA_USER, process.env.JIRA_PASSWORD, process.env.JIRA_API_VERSION));
//app.set('fecru', fecru(process.env.FECRU_URL, process.env.JIRA_USER, process.env.JIRA_PASSWORD));

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressPromise());

app.use('/', require('./server/routes/index'));
app.use('/auth', require('./server/routes/auth'));

app.use('/api', auth.authorizationChecker);
//app.use('/api/jira', require('./server/routes/api/jira'));

var requestProxy = require('express-request-proxy');
app.use('/api/proxy/jira/auth/*', requestProxy({
    url: 'https://jira.symmetrics.de/rest/auth/latest/*'
}));



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
