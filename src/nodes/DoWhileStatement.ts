import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import type { DoWhileStatement as IDoWhileStatement } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc } from 'prettier';
import type { NodePrinter } from './types';

const { group, indent, line } = doc.builders;

const printBody = (
  node: IDoWhileStatement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

export const DoWhileStatement: NodePrinter<IDoWhileStatement> = {
  print: ({ node, path, print }) => [
    'do',
    printBody(node, path, print),
    'while (',
    printSeparatedItem(path.call(print, 'condition')),
    ');'
  ]
};