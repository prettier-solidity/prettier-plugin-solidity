const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const BinaryOperation = (node, path, options, print) => {
  return join(' ', [
    path.call(print, 'left'),
    node.operator,
    path.call(print, 'right')
  ]);
};

module.exports = BinaryOperation;
