module.exports = function(req, res, next) {
  var newUser = req.user;
  if (req.body['new-password'] || req.body['confirm-password']) {
    if (req.body['current-password'] !== req.user['password']) {
      req.flash('danger', 'Incorrect password.');
      res.redirect('/profile');
    } else if (req.body['new-password'] !== req.body['confirm-password']) {
      req.flash('danger', 'Passwords do not match.');
      res.redirect('/profile');
    } else {
      newUser.password = req.body['new-password'];
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      updateUser(req, res, next, newUser);
    }
  } else {
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    updateUser(req, res, next, newUser);
  }
}

function updateUser(req, res, next, newUser) {
  var update = {name: newUser.name, email: newUser.email};
  if (newUser.password) update.password = newUser.password;
  req.app.db.collection('users').updateOne({username: req.user.username}, {$set: update},
    function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.result.ok && result.modifiedCount === 1) {
        res.cookie('tolkien-auth', newUser);
        req.flash('success', 'Profile updated.');
        res.redirect('/profile');
      } else {
        throw 'DB error on profile update';
      }
    }
  );
}
