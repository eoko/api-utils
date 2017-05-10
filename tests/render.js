require('should')();
require('should-sinon');

const render = require('./../src').Utils.renderTemplate;

describe('Utils > Render', () => {
  it('Should have a proper call', () => {
    (() => render(null, null, null)).should.throw();
  });

  it('Should use available template', () => {
    (() => render({ username: 'merlin' }, 'lodash', 'hello {{ username }}')).should.throw();
  });

  it('Should render string', done => {
    render({ username: 'merlin' }, 'mustache', 'hello {{ username }}')
      .then(res => res.should.be.equal('hello merlin'))
      .then(() => done())
      .catch(done);
  });

  it('Should render and object', done => {
    render(
      { username: 'merlin', when: 'today' },
      'mustache',
      {
        subject: 'hello {{ username }}',
        body: 'How are you {{ when }} ?',
      })
      .then(res => {
        res.should.be.eql({
          body: 'How are you today ?',
          subject: 'hello merlin',
        });
      })
      .then(() => done())
      .catch(done);
  });
});
