import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, hardline, indent, line } = doc.builders;

export class IfStatement extends SlangNode {
  readonly kind = NonterminalKind.IfStatement;

  condition: Expression;

  body: Statement;

  elseBranch?: ElseBranch;

  constructor(ast: ast.IfStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.condition = new Expression(ast.condition, options);
    this.body = new Statement(ast.body, options);
    if (ast.elseBranch) {
      this.elseBranch = new ElseBranch(ast.elseBranch, options);
    }

    this.updateMetadata(this.condition, this.body, this.elseBranch);
  }

  print(path: AstPath<IfStatement>, print: PrintFunction): Doc {
    const { kind: bodyKind, comments: bodyComments } = this.body.variant;
    const body = path.call(print, 'body');
    return [
      'if (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
      bodyKind === NonterminalKind.Block
        ? [' ', body]
        : group(indent([line, body]), {
            shouldBreak: bodyKind === NonterminalKind.IfStatement // `if` within `if`
          }),
      this.elseBranch
        ? [
            bodyKind !== NonterminalKind.Block || // else on a new line if body is not a block
            bodyComments.some(
              (comment) =>
                !isBlockComment(comment) || comment.placement === 'ownLine'
            ) // or if body has trailing single line comments or a block comment on a new line
              ? hardline
              : ' ',
            path.call(print, 'elseBranch')
          ]
        : ''
    ];
  }
}
