const Ajv = require('ajv');

const assertSchema = require('../utils/assertJsonSchema');

const ajv      = new Ajv({ allErrors: true, removeAdditional: true });

module.exports = (schema) => {
  const validate = ajv.compile(schema);
  
  return function(req, res, next) {
    assertSchema(validate, req.body)
      .then(() => next())
      .catch((err) => next(err));
  }; 
};