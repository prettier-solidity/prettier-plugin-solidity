import { printSeparatedList } from '../common/printer-helpers.js';

const parameters = (node, path, print) =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') '
      ]
    : '';

export const CatchClause = {
  print: ({ node, path, print }) => [
    'catch ',
    parameters(node, path, print),
    path.call(print, 'body')
  ]
};
