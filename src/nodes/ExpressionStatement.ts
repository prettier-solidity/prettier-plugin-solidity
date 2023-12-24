import { doc } from 'prettier';
import { printComments } from '../common/printer-helpers.js';
import type { ExpressionStatement as IExpressionStatement } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { hardline } = doc.builders;

export const ExpressionStatement: NodePrinter<IExpressionStatement> = {
  print: ({ node, options, path, print }) => {
    const comments =
      path.getParentNode().type === 'IfStatement'
        ? printComments(node, path, options)
        : [];

    return [
      comments.length ? [comments, hardline] : '',
      path.call(print, 'expression'),
      node.omitSemicolon ? '' : ';'
    ];
  }
};
