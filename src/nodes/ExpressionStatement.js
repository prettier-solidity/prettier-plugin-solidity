const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const ExpressionStatement = {
  print: ({ node, path, print }) =>
    concat([
      node.expression ? path.call(print, 'expression') : '',
      node.omitSemicolon ? '' : ';'
    ])
};

module.exports = ExpressionStatement;
