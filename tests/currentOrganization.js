require('should')();
require('should-sinon');

const sinon = require('sinon');

const currentOrganization = require('./../src').Middlewares.currentOrganization;

describe('Middleware > Current Organization', () => {
  it('Should have a proper call', () => {
    (() => currentOrganization('coucou')(null, null, null)).should.throw();
  });

  it('Should have organizations in headers and valid for default field', () => {
    const req  = { organizations: ['sample'], params: { organization: 'sample' } };
    const next = sinon.spy();

    (() => currentOrganization()(req, null, next)).should.not.throw();
  });

  it('Should have organizations in headers and valid for field', () => {
    const req  = { organizations: ['sample'], params: { org: 'sample' } };
    const next = sinon.spy();

    (() => currentOrganization('org')(req, null, next)).should.not.throw();
  });

  it('Should return an error for organization not in field', () => {
    const req  = { organizations: ['sample'], params: { org: 'another' } };
    const next = sinon.spy();

    (() => currentOrganization('org')(req, null, next)).should.throw();
  });
});
