import { doc } from 'prettier';

const { group, line, indent } = doc.builders;

export const assignment = {
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
  print: (node, path, print) => [
    path.call(print, 'left'),
    ' ',
    node.operator,
    node.right.type === 'BinaryOperation'
      ? group(indent([line, path.call(print, 'right')]))
      : [' ', path.call(print, 'right')]
  ]
};
