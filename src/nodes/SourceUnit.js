import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/printer-helpers.js';

const { line } = doc.builders;

export const SourceUnit = {
  print: ({ node, options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    printComments(node, path, options),
    options.parentParser ? '' : line
  ]
};
