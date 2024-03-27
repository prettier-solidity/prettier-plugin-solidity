import { printSeparatedList } from '../common/printer-helpers.ts';

const printArguments = (node, path, print) =>
  node.arguments?.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

export const InheritanceSpecifier = {
  print: ({ node, path, print }) => [
    path.call(print, 'baseName'),
    printArguments(node, path, print)
  ]
};
