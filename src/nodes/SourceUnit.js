import { doc } from 'prettier';
import { printPreservingEmptyLines } from '../common/printer-helpers.js';

const { line } = doc.builders;

export const SourceUnit = {
  print: ({ options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    options.parentParser ? '' : line
  ]
};
