import { doc } from 'prettier';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.ts';

const { join, line } = doc.builders;

const returnParameters = (node, path, print) =>
  node.returnParameters
    ? [
        'returns (',
        printSeparatedList(path.map(print, 'returnParameters')),
        ') '
      ]
    : '';

export const TryStatement = {
  print: ({ node, path, print }) => [
    'try',
    printSeparatedItem(path.call(print, 'expression'), {
      firstSeparator: line
    }),
    returnParameters(node, path, print),
    path.call(print, 'body'),
    ' ',
    join(' ', path.map(print, 'catchClauses'))
  ]
};
