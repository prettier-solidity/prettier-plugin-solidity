/* eslint-disable implicit-arrow-linebreak */
const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const ForStatement = {
  print: ({ node, path, print }) =>
    concat([
      'for (',
      node.initExpression ? path.call(print, 'initExpression') : '',
      '; ',
      node.conditionExpression ? path.call(print, 'conditionExpression') : '',
      '; ',
      path.call(print, 'loopExpression'),
      ') ',
      path.call(print, 'body')
    ])
};

module.exports = ForStatement;
