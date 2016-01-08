var crypto = require('crypto');
module.exports = function(req, res, next) {
  if (req.cookies['tolkien-auth']) {
    req.user = req.cookies['tolkien-auth'];
    if (req.user.email) {
      req.user.avatar = 'http://www.gravatar.com/avatar/'
          + crypto.createHash('md5').update(req.user.email).digest('hex')
          + '?d=retro&s=256';
    } else {
      req.user.avatar = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&s=256';
    }
  }
  next();
}
