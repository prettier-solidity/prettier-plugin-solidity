const proxyquire = require('proxyquire');
const prettier = require('prettier/standalone.js');

const proxyquirePlugin = () => {
  const prettierMock = { ...prettier, version: '2.2.1', '@global': true };

  const plugin = proxyquire('../../../dist/standalone.cjs', {
    'prettier/standalone': prettierMock
  });

  return { plugin, prettierMock };
};

module.exports = proxyquirePlugin;
