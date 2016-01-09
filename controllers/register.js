module.exports = function(req, res, next) {
  if (!req.body.username || !req.body.name
      || !req.body.email
      || !req.body.password
      || !req.body['confirm-password']) {
    req.flash('danger', 'All fields are required.');
    res.render('register', {user: {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email
    }});
    return;
  } else if (req.body.password !== req.body['confirm-password']) {
    req.flash('danger', 'Passwords do not match.');
    res.render('register', {user: {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email
    }});
    return;
  }

  req.app.db.collection('users').findOne({username: req.body.username}, function (err, user) {
    if (err) throw err;
    if (user) {
      req.flash('danger', 'That username is already taken.');
      res.render('register', {user: {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email
      }});
    } else {
      req.app.db.collection('users').insert({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }, function (err, result) {
        if (err) throw err;
        if (result.result.ok && result.insertedCount === 1) {
          req.flash('success', 'Account created. Please log in.');
          res.redirect('/login');
        } else {
          throw 'DB error on register';
        }
      });
    }
  });
}
