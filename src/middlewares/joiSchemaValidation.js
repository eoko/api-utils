const Joi                = require('joi');
const assert             = require('assert');
const JoiValidationError = require('./../errors/joiValidationError');

module.exports = function validating(schema) {
  assert.equal(typeof schema, 'object', 'req must be an object');

  return (req, res, next) => {
    assert.equal(typeof req, 'object', 'req must be an object');

    Joi.validate(req.body, schema, (err, doc) => {
      if (err) {
        next(new JoiValidationError(err));
      } else {
        req.body = doc; // eslint-disable-line no-param-reassign
        next();
      }
    });
  };
};
