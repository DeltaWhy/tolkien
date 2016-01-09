var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userParser = require('./user-parser');
var login = require('./controllers/login');
var profile = require('./controllers/profile');

var db = require('monk')('localhost/tolkien-'+(process.env.NODE_ENV || 'development'));
var users = db.get('users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(userParser);

app.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', function(req, res, next) {
  res.render('login', { title: 'Tolkien' });
});

app.get('/register', function(req, res, next) {
  res.render('register', { title: 'Tolkien' });
});

app.get('/profile', function(req, res, next) {
  if (req.user) {
    res.render('profile', { title: 'Tolkien', user: req.user });
  } else {
    req.flash('warning', 'You are not logged in.');
    res.redirect('/login');
  }
});

app.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Tolkien' });
});

app.get('/forgot-password', function(req, res, next) {
  res.render('forgot-password', { title: 'Tolkien' });
});

app.post('/login', login);
app.post('/profile', profile);
app.post('/logout', function(req, res, next) {
  res.clearCookie('tolkien-auth');
  req.flash('success', 'Logged out.');
  res.redirect('/');
});

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
