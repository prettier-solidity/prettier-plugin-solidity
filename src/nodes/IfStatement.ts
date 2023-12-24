import { doc } from 'prettier';
import {
  printComments,
  printSeparatedItem
} from '../common/printer-helpers.js';
import type {
  IfStatement as IIfStatement,
  Statement
} from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { NodePrinter } from './types';

const { group, hardline, indent, line } = doc.builders;

const printTrueBody = (
  trueBodyNode: Statement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  trueBodyNode.type === 'Block'
    ? [' ', path.call(print, 'trueBody')]
    : group(indent([line, path.call(print, 'trueBody')]), {
        shouldBreak: trueBodyNode.type === 'IfStatement' // `if` within `if`
      });

const printFalseBody = (
  falseBodyNode: Statement,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
  falseBodyNode.type === 'Block' || falseBodyNode.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (
  node: IIfStatement,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc => {
  if (node.falseBody) {
    const comments = printComments(node, path, options);
    return [
      comments.length ? [hardline, comments] : '',
      node.trueBody.type !== 'Block' || comments.length > 0
        ? hardline // `else` on new line
        : ' ',
      'else',
      printFalseBody(node.falseBody, path, print)
    ];
  }
  return '';
};

export const IfStatement: NodePrinter<IIfStatement> = {
  print: ({ node, path, print, options }) => [
    'if (',
    printSeparatedItem(path.call(print, 'condition')),
    ')',
    printTrueBody(node.trueBody, path, print),
    printElse(node, path, print, options)
  ]
};
