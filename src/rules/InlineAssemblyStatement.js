const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const InlineAssemblyStatement = (node, path, options, print) => {
  // @TODO: add support for assembly language specifier
  return concat(['assembly ', path.call(print, 'body')]);
};

module.exports = InlineAssemblyStatement;
