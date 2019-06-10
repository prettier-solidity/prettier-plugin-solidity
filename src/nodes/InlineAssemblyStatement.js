const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

// @TODO: add support for assembly language specifier
const InlineAssemblyStatement = {
  print: ({ path, print }) => concat(['assembly ', path.call(print, 'body')])
};
module.exports = InlineAssemblyStatement;
