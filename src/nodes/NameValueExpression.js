const NameValueExpression = {
  print: ({ path, print }) => [
    '{',
    path.call(print, 'arguments'),
    '}',
    ' ',
    path.call(print, 'expression'),
  ]
};

module.exports = NameValueExpression;
