require('should')();
require('should-sinon');

const sinon = require('sinon');
const Joi   = require('joi');

const joiSchemaValidation = require('./../src').Middlewares.joiSchemaValidation;
const JoiValidationError  = require('./../src/errors/joiValidationError');

describe('Middleware > joiSchemaValidation', () => {
  const schema = Joi.object()
                    .keys({
                      username: Joi.string()
                                   .alphanum()
                                   .min(3)
                                   .max(30)
                                   .required(),
                      password: Joi.string()
                                   .regex(/^[a-zA-Z0-9]{3,30}$/),
                      access_token: [Joi.string(), Joi.number()],
                      birthyear: Joi.number()
                                    .integer()
                                    .min(1900)
                                    .max(2013),
                      email: Joi.string()
                                .email(),
                    })
                    .with('username', 'birthyear')
                    .without('password', 'access_token');

  it('Should have a proper call', () => {
    (() => joiSchemaValidation(null)(null, null, null)).should.throw();
    (() => joiSchemaValidation({})(null, null, null)).should.throw();
  });

  it('Should validate', () => {
    const req  = { body: { username: 'abc', birthyear: 1994 } };
    const next = sinon.spy();

    joiSchemaValidation(schema)(req, null, next);

    next.should.be.calledOnce();
    next.getCalls()[0].args.should.have.length(0);
  });

  it('Should invalidate', () => {
    const req  = { body: {} };
    const next = sinon.spy();
    joiSchemaValidation(schema)(req, null, next);

    next.should.be.calledOnce();
    next.getCalls()[0].args.should.have.length(1);
    next.getCalls()[0].args[0].should.be.instanceOf(JoiValidationError);
  });
});
