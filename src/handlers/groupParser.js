const assert = require('assert');

module.exports = function groupParser(req, res, next) {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(typeof req.headers, 'object', 'req.headers must be an object');

  const groups = [];
  const member = [];
  const admin  = [];
  const owner  = [];

  if (typeof req.headers['x-consumer-groups'] === 'string') {
    req
      .headers['x-consumer-groups']
      .split(',')
      .forEach(item => {
        const group = item.trim();

        const split = group.split('_');

        if (split[0] === 'org') {
          const org   = split[1];
          const level = split[2];

          switch (level) {
            case 'owner':
              owner.push(org);
              break;
            case 'admin':
              admin.push(org);
              break;
            default:
              member.push(org);
          }
        } else {
          groups.push(group);
        }
      });
  }

  req.isAdmin   = groups.includes('admin'); // eslint-disable-line no-param-reassign
  req.isUser    = groups.includes('user'); // eslint-disable-line no-param-reassign
  req.isService = groups.includes('service'); // eslint-disable-line no-param-reassign

  req.groups = groups; // eslint-disable-line no-param-reassign
  req.owner  = owner; // eslint-disable-line no-param-reassign
  req.admin  = admin; // eslint-disable-line no-param-reassign
  req.member = member; // eslint-disable-line no-param-reassign

  return next();
};
