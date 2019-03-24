/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { join }
  }
} = require('prettier');

const Conditional = {
  print: ({ path, print }) =>
    join(' ', [
      path.call(print, 'condition'),
      '?',
      path.call(print, 'trueExpression'),
      ':',
      path.call(print, 'falseExpression')
    ])
};

module.exports = Conditional;
