import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { group, hardline } = doc.builders;

export const EnumDefinition = {
  print: ({ node, path, print }) =>
    group([
      'enum ',
      node.name,
      ' {',
      printSeparatedList(path.map(print, 'members'), {
        firstSeparator: hardline
      }),
      '}'
    ])
};
