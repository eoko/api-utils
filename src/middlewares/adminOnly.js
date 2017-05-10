const restify = require('restify');
const assert  = require('assert');

function adminOnly(req, res, next) {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(Array.isArray(req.groups), true, 'req.groups must be an array of group');

  if (req.groups.indexOf('admin') === -1) {
    return next(new restify.UnauthorizedError());
  }

  return next();
}

module.exports = adminOnly;
