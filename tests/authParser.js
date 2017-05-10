const should = require('should');

should();

require('should-sinon');

const sinon   = require('sinon');
const restify = require('restify');

const authParser = require('./../src').Handlers.authParser;

describe('Handler > AuthParser', () => {
  it('Should have a proper call', () => {
    (() => authParser(null, null, null)).should.throw();
  });

  it('Should have headers', () => {
    const req  = { headers: {} };
    const next = sinon.spy();

    (() => authParser(req, null, next)).should.not.throw();
  });

  it('Should add auths on request with custom id', () => {
    const req  = { headers: { 'X-Consumer-Custom-ID': 'azertyuiop' } };
    const next = sinon.spy();

    authParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    should(req.currentUser).be.equal(null);
  });

  it('Should add auths on request with username', () => {
    const req  = { headers: { 'X-Consumer-Username': 'merlin' } };
    const next = sinon.spy();

    authParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    should(req.currentUser).be.equal(null);
  });

  it('Should add auths on request with username and id', () => {
    const req  = {
      headers: {
        'X-Consumer-Username': 'merlin',
        'X-Consumer-Custom-ID': 'azertyuiop',
      },
    };
    const next = sinon.spy();

    authParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    req.currentUser.should.be.eql({
      username: 'merlin',
      id: 'azertyuiop',
    });
  });
});
