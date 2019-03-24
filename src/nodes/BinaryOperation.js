/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const BinaryOperation = {
  print: ({ node, path, print }) =>
    join(' ', [
      path.call(print, 'left'),
      node.operator,
      path.call(print, 'right')
    ])
};

module.exports = BinaryOperation;
