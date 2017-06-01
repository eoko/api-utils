module.exports = (req, res, next) => {
  assert.equal(typeof req, 'object', 'req must be an object of group');
  assert.equal(typeof req.headers, 'object', 'req.headers must be an object');
  assert.equal(typeof req.query, 'object', 'req.query must be an object');

  let offset = parseInt(req.headers['X-Pagination-Offset'] || req.query.offset, 10);
  let limit  = parseInt(req.headers['X-Pagination-Limit'] || req.query.limit, 10);

  offset = offset >= 0 ? offset : 0;
  limit = limit >= 0 ? limit : 10;

  req.pagination = { offset, limit };
  next();
};
