const {
  doc: {
    builders: { concat }
  }
} = require('prettier/standalone');

const NameValueExpression = {
  print: ({ path, print }) =>
    concat([
      path.call(print, 'expression'),
      '{',
      path.call(print, 'arguments'),
      '}'
    ])
};

module.exports = NameValueExpression;
