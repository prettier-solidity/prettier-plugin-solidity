const ExpressionNameValue = {
  print: ({ path, print }) => [
    path.call(print, 'expression'),
    '{',
    path.call(print, 'arguments'),
    '}'
  ]
};

module.exports = ExpressionNameValue;
