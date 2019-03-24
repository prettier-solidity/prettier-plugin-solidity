/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const WhileStatement = {
  print: ({ path, print }) =>
    concat([
      'while (',
      path.call(print, 'condition'),
      ') ',
      path.call(print, 'body')
    ])
};

module.exports = WhileStatement;
