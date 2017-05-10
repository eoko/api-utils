const assert  = require('assert');
const restify = require('restify');

function currentOrganization(field) {
  const param = field || 'organization';

  return function curOrganization(req, res, next) {
    assert.equal(typeof req, 'object', 'req must be an object of group');
    assert.equal(Array.isArray(req.organizations), true, 'req.organization must be an array');

    if (!req.organizations.includes(req.params[param])) {
      throw new restify.UnauthorizedError(`No organization for field ${param}`);
    }

    req.currentOrganization = req.params[param]; // eslint-disable-line no-param-reassign
    return next();
  };
}

module.exports = currentOrganization;
