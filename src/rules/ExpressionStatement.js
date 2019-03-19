const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const ExpressionStatement = (node, path, options, print) =>
  concat([
    node.expression ? path.call(print, 'expression') : '',
    node.omitSemicolon ? '' : ';'
  ]);

module.exports = ExpressionStatement;
