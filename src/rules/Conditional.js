const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const Conditional = (node, path, options, print) => {
  return join(' ', [
    path.call(print, 'condition'),
    '?',
    path.call(print, 'trueExpression'),
    ':',
    path.call(print, 'falseExpression')
  ]);
};

module.exports = Conditional;
