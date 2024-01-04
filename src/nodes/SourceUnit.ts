import { doc } from 'prettier';
import {
  printComments,
  printPreservingEmptyLines
} from '../common/printer-helpers.js';
import type { SourceUnit as ISourceUnit } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { line } = doc.builders;

export const SourceUnit: NodePrinter<ISourceUnit> = {
  print: ({ node, options, path, print }) => [
    printPreservingEmptyLines(path, 'children', options, print),
    printComments(node, path, options),
    options.parentParser ? '' : line
  ]
};
