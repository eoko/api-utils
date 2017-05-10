const ValidationError = require('../errors/jsonSchemaValidationError');

module.exports = (validate, data) => {
  return new Promise((resolve, reject) => {
    if (typeof validate === 'object') reject(new Error('Validate must be an object'));

    const valid = validate(data);

    if (!valid) {
      const error      = new ValidationError(validate.errors);
      error.errorsText = 'Invalid validation';
      error.actual     = data;
      reject(error);
    }

    resolve(data);
  });
};
