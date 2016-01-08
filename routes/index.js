var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tolkien' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Tolkien' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Tolkien' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Tolkien' });
});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Tolkien' });
});

module.exports = router;
