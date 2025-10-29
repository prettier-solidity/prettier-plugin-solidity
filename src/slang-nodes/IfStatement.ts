import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';
import { ElseBranch } from './ElseBranch.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { hardline } = doc.builders;

export class IfStatement extends SlangNode {
  readonly kind = NonterminalKind.IfStatement;

  condition: Expression['variant'];

  body: Statement['variant'];

  elseBranch?: ElseBranch;

  constructor(ast: ast.IfStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.condition = extractVariant(new Expression(ast.condition, options));
    this.body = extractVariant(new Statement(ast.body, options));
    if (ast.elseBranch) {
      this.elseBranch = new ElseBranch(ast.elseBranch, options);
    }

    this.updateMetadata(this.condition, this.body, this.elseBranch);
  }

  print(path: AstPath<IfStatement>, print: PrintFunction): Doc {
    const { kind: bodyKind, comments: bodyComments } = this.body;
    return [
      'if (',
      printSeparatedItem(path.call(print, 'condition')),
      ')',
      printIndentedGroupOrSpacedDocument(
        path.call(print, 'body'),
        bodyKind !== NonterminalKind.Block,
        // `if` within `if`
        { shouldBreak: bodyKind === NonterminalKind.IfStatement }
      ),
      this.elseBranch
        ? [
            bodyKind !== NonterminalKind.Block || // else on a new line if body is not a block
            bodyComments?.some(
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
