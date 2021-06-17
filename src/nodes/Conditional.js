const {
  builders: { group, indent, line }
} = require('prettier/doc');

const Conditional = {
  print: ({ path, print }) =>
    group([
      path.call(print, 'condition'),
      indent([
        line,
        '? ',
        path.call(print, 'trueExpression'),
        line,
        ': ',
        path.call(print, 'falseExpression')
      ])
    ])
};

module.exports = Conditional;
