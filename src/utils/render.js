const assert = require('assert');
const cons   = require('consolidate');

const availableEngines = ['handlebars', 'pug', 'mustache'];

module.exports = (vars, engine, stringTemplates) => {
  assert.equal(typeof vars === 'object', true, 'vars must be an object');
  assert.equal(typeof engine === 'string', true, 'engine must be a string');
  assert.equal(
    availableEngines.includes(engine),
    true,
    `engine must be one of ${availableEngines.join(', ')}`
  );
  assert.equal(
    typeof stringTemplates === 'object' || typeof stringTemplates === 'string',
    true,
    'stringTemplates must be an object'
  );

  const promises = [];
  const rendered = {};

  if (typeof stringTemplates === 'string') {
    return cons[engine].render(stringTemplates, vars);
  }

  Object
    .keys(stringTemplates)
    .forEach(key => {
      promises.push(
        cons[engine]
          .render(stringTemplates[key], vars)
          .then(res => {
            rendered[key] = res;
            return res;
          })
      );
    });

  return Promise
    .all(promises)
    .then(() => rendered);
};
