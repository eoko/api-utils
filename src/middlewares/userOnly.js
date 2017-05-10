const restify = require('restify');
const assert  = require('assert');

function userOnly(req, res, next) {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(typeof req.currentUser, 'object', 'req.headers must be an object');

  if (req.currentUser === null) {
    return next(new restify.UnauthorizedError());
  }

  return next();
}

module.exports = userOnly;
