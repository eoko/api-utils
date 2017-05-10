const assert = require('assert');

module.exports = function groupParser(req, res, next) {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(typeof req.headers, 'object', 'req.headers must be an object');

  const groups        = [];
  const organizations = [];

  if (typeof req.headers['x-consumer-groups'] === 'string') {
    req
      .headers['x-consumer-groups']
      .split(',')
      .forEach(item => {
        const group = item.trim();
        groups.push(group);

        if (group.startsWith('org_')) {
          organizations.push(group.substr(4));
        }
      });
  }

  req.isOrganization = !!groups.includes('org'); // eslint-disable-line no-param-reassign
  req.isAdmin        = !!groups.includes('admin'); // eslint-disable-line no-param-reassign
  req.isUser         = !!groups.includes('user'); // eslint-disable-line no-param-reassign
  req.isService      = !!groups.includes('service'); // eslint-disable-line no-param-reassign

  req.groups        = groups; // eslint-disable-line no-param-reassign
  req.organizations = organizations; // eslint-disable-line no-param-reassign

  return next();
};
