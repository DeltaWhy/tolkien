module.exports = function(req, res, next) {
  var newUser = req.user;
  console.log(req.body);
  if (req.body['new-password'] || req.body['confirm-password']) {
    if (req.body['current-password'] !== req.user['password']) {
      req.flash('danger', 'Incorrect password.');
    } else if (req.body['new-password'] !== req.body['confirm-password']) {
      req.flash('danger', 'Passwords do not match.');
    } else {
      newUser.password = req.body['new-password'];
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      res.cookie('tolkien-auth', newUser);
      req.flash('success', 'Profile updated.');
    }
  } else {
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    res.cookie('tolkien-auth', newUser);
    req.flash('success', 'Profile updated.');
  }
  res.redirect('/profile');
}
