import { printSeparatedList } from '../common/printer-helpers.js';

const parameters = (node, path, print) =>
  node.parameters?.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

export const CustomErrorDefinition = {
  print: ({ node, path, print }) => [
    'error ',
    node.name,
    '(',
    parameters(node, path, print),
    ');'
  ]
};
