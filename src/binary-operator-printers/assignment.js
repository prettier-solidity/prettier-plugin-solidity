const {
  doc: {
    builders: { group, line, concat, indent }
  }
} = require('prettier/standalone');

module.exports = {
  match: (op) =>
    [
      '=',
      '|=',
      '^=',
      '&=',
      '<<=',
      '>>=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%='
    ].includes(op),
  print: (node, path, print) =>
    concat([
      path.call(print, 'left'),
      ' ',
      node.operator,
      node.right.type === 'BinaryOperation'
        ? group(indent(concat([line, path.call(print, 'right')])))
        : concat([' ', path.call(print, 'right')])
    ])
};
