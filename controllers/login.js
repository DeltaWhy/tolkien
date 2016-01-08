module.exports = function(req, res, next) {
  res.cookie('tolkien-auth', req.body);
  req.flash('success', 'Logged in.');
  res.redirect('/profile');
}
