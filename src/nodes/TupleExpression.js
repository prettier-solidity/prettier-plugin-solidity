import { printSeparatedList } from '../common/printer-helpers.ts';

const contents = (node, path, print) =>
  node.components?.length === 1 && node.components[0].type === 'BinaryOperation'
    ? path.map(print, 'components')
    : printSeparatedList(path.map(print, 'components'));

export const TupleExpression = {
  print: ({ node, path, print }) => [
    node.isArray ? '[' : '(',
    contents(node, path, print),
    node.isArray ? ']' : ')'
  ]
};
