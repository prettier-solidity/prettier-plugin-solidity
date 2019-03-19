const {
  doc: {
    builders: { concat }
  }
} = require('prettier');

const WhileStatement = (node, path, options, print) => {
  return concat([
    'while (',
    path.call(print, 'condition'),
    ') ',
    path.call(print, 'body')
  ]);
};

module.exports = WhileStatement;
