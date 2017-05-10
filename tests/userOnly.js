require('should')();
require('should-sinon');

const sinon   = require('sinon');
const restify = require('restify');

const adminOnly = require('./../src').Middlewares.userOnly;

describe('Middleware > AdminOnly', () => {
  it('Should have a proper call', () => {
    (() => adminOnly(null, null, null)).should.throw();
  });

  it('Should have groups in headers', () => {
    const req  = { groups: ['sample'] };
    const next = sinon.spy();

    (() => adminOnly(req, null, next)).should.not.throw();
  });

  it('Should return an error for non admin group', () => {
    const req  = { groups: [] };
    const next = sinon.spy();

    adminOnly(req, null, next);

    next.should.be.calledWith(new restify.UnauthorizedError());
  });

  it('Should grant access for admin group', () => {
    const req  = { groups: ['admin'] };
    const next = sinon.spy();

    adminOnly(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
  });
});
