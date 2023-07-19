import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';

const { line, softline } = doc.builders;

export const NameValueList = {
  print: ({ node, path, print, options }) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument, index) => [node.names[index], ': ', argument]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};
