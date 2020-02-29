const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const UnaryOperation = {
  print: ({ node, path, print }) =>
    node.isPrefix
      ? concat([
          node.operator,
          node.operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression')
        ])
      : concat([path.call(print, 'subExpression'), node.operator])
};

module.exports = UnaryOperation;
