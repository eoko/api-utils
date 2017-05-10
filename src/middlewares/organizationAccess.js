const restify = require('restify');

function organizationAccess(req, res, next) {
  if (req.isOrganization && req.organizations.length === 1) {
    req.body.organization = req.organizations[0];
    return next();
  }

  if (req.isUser && req.organizations.includes(req.body.organization)) {
    return next();
  }

  if (req.isAdmin || req.isService) {
    return next();
  }

  return next(new restify.ForbiddenError('You don\'t have sufficient right to create a transmission.'));
}

module.exports = organizationAccess;
