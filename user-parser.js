module.exports = function(req, res, next) {
  if (req.cookies['tolkien-auth']) {
    req.user = req.cookies['tolkien-auth'];
  }
  next();
}
