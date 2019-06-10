const {
  doc: {
    builders: { concat, group, indent, line }
  }
} = require('prettier/standalone');

const Conditional = {
  print: ({ path, print }) =>
    group(
      concat([
        path.call(print, 'condition'),
        indent(line),
        '? ',
        path.call(print, 'trueExpression'),
        indent(line),
        ': ',
        path.call(print, 'falseExpression')
      ])
    )
};

module.exports = Conditional;
