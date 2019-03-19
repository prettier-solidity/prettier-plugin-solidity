const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

// @TODO: add support for assembly language specifier
const InlineAssemblyStatement = (node, path, options, print) =>
  concat(['assembly ', path.call(print, 'body')]);
module.exports = InlineAssemblyStatement;
