const {
  doc: {
    builders: { concat, join }
  }
} = require('prettier/standalone');

const UnaryOperation = {
  print: ({ node, path, print }) => {
    if (node.isPrefix) {
      if (node.operator === 'delete') {
        return join(' ', [node.operator, path.call(print, 'subExpression')]);
      }
      return concat([node.operator, path.call(print, 'subExpression')]);
    }
    return concat([path.call(print, 'subExpression'), node.operator]);
  }
};

module.exports = UnaryOperation;
