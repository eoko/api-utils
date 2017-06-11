const assert  = require('assert');
const restify = require('restify');

function levelOnly(level, field) {
  const param = field || 'organization';

  assert.equal(['member', 'admin', 'owner'].includes(level), true, 'The level can only be member, admin or owner');

  return function ownerOnly(req, res, next) {
    assert.equal(typeof req, 'object', 'req must be an object');
    assert.equal(Array.isArray(req[level]), true, 'req.organization must be an array');

    const org = req.params[param];

    if (!req[level].includes(org)) {
      throw new restify.UnauthorizedError(`You are not an ${level} of the organization ${org}`);
    }

    return next();
  };
}

module.exports = levelOnly;
