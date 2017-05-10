require('should')();
require('should-sinon');

const sinon   = require('sinon');
const restify = require('restify');

const groupParser = require('./../src').Handlers.groupParser;

describe('Handler > GroupParser', () => {
  it('Should have a proper call', () => {
    (() => groupParser(null, null, null)).should.throw();
  });

  it('Should have headers', () => {
    const req  = { headers: {} };
    const next = sinon.spy();

    (() => groupParser(req, null, next)).should.not.throw();
  });

  it('Should add groups on request with one', () => {
    const req  = { headers: { 'x-consumer-groups': 'admin' } };
    const next = sinon.spy();

    groupParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    req.groups.should.be.eql(['admin']);
  });

  it('Should add groups on request with groups separate by comma', () => {
    const req  = { headers: { 'x-consumer-groups': 'admin,user, another    , strange , space' } };
    const next = sinon.spy();

    groupParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    req.groups.should.be.eql(['admin', 'user', 'another', 'strange', 'space']);
  });

  it('Should add groups on request with groups separate by comma and with organizations', () => {
    const req  = { headers: { 'x-consumer-groups': 'admin,user, another    , org_space' } };
    const next = sinon.spy();

    groupParser(req, null, next);

    next.should.be.calledOnce();
    next.should.not.be.calledWith(new restify.UnauthorizedError());
    next.getCalls()[0].args.should.have.length(0);
    req.groups.should.be.eql(['admin', 'user', 'another', 'org_space']);
    req.organizations.should.be.eql(['space']);
  });
});
