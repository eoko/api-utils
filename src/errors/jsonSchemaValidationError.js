const restify = require('restify');
const util    = require('util');

function jsonSchemaValidationError(errors) {
  restify.RestError.call(this, {
    restCode: 'ValidationError',
    statusCode: 406,
    message: 'We cannot validate your request',
    constructorOpt: jsonSchemaValidationError,
  });

  this.name = 'jsonSchema Validation Error';
  this.body.errors = errors;
}

util.inherits(jsonSchemaValidationError, restify.RestError);

module.exports = jsonSchemaValidationError;
