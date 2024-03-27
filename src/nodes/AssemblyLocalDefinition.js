import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.ts';

const { line } = doc.builders;

export const AssemblyLocalDefinition = {
  print: ({ node, path, print }) => [
    'let',
    printSeparatedList(path.map(print, 'names'), { firstSeparator: line }),
    node.expression ? [':= ', path.call(print, 'expression')] : ''
  ]
};
