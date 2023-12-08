import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { hardline } = doc.builders;

export const EnumDefinition = {
  print: ({ node, path, print }) => [
    'enum ',
    node.name,
    ' {',
    printSeparatedList(path.map(print, 'members'), {
      firstSeparator: hardline
    }),
    '}'
  ]
};
