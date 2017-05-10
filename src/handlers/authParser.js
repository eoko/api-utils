const assert = require('assert');

module.exports = function authParser(req, res, next) {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(typeof req.headers, 'object', 'req.headers must be an object');

  req.currentUser = null; // eslint-disable-line no-param-reassign

  if (typeof req.headers['x-consumer-custom-id'] === 'string') {
    if (typeof req.headers['x-consumer-username'] === 'string') {
      req.currentUser = { // eslint-disable-line no-param-reassign
        username: req.headers['x-consumer-username'],
        id: req.headers['x-consumer-custom-id'],
      };
    }
  }

  return next();
};
