const restify = require('restify');
const util    = require('util');
const assert  = require('assert');

function JoiValidationError(joiError) {
  assert.equal(joiError instanceof Error, true, 'Joi error must be instance of error');

  restify.RestError.call(this, {
    restCode: 'ValidationError',
    statusCode: 406,
    message: joiError.message,
    constructorOpt: JoiValidationError,
  });
  this.name = 'Joi Validation Error';
  this.body.errors = joiError.details;
}

util.inherits(JoiValidationError, restify.RestError);

module.exports = JoiValidationError;
