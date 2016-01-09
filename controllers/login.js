var db = require('monk')('localhost/tolkien-'+(process.env.NODE_ENV || 'development'));
var users = db.get('users');

module.exports = function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    req.flash('warning', 'Please enter a username and password.');
    res.render('login', { title: 'Tolkien' });
    return;
  }
  users.findOne({username: req.body.username}).success(function(user) {
    if (!user) {
      req.flash('danger', 'Incorrect username.');
      res.render('login', { title: 'Tolkien' });
    } else if (user.password !== req.body.password) {
      req.flash('danger', 'Incorrect password.');
      res.render('login', { title: 'Tolkien' });
    } else {
      res.cookie('tolkien-auth', user);
      req.flash('success', 'Logged in.');
      res.redirect('/profile');
    }
  }).error(function(error) {
    throw error;
  });
}
