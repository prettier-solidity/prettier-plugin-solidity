import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { hardline } from '../slang-printers/prettier-builders.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.ts';
import { isBlockComment } from '../slang-utils/is-comment.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';
import { Statement } from './Statement.ts';
import { ElseBranch } from './ElseBranch.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class IfStatement extends SlangNode {
  readonly kind = NonterminalKind.IfStatement;

  condition: Expression['variant'];

  body: Statement['variant'];

  elseBranch?: ElseBranch;

  constructor(ast: ast.IfStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.condition = extractVariant(new Expression(ast.condition, collected));
    this.body = extractVariant(new Statement(ast.body, collected));
    if (ast.elseBranch) {
      this.elseBranch = new ElseBranch(ast.elseBranch, collected);
    }

    this.updateMetadata(this.condition, this.body, this.elseBranch);
  }

  print(print: PrintFunction): Doc {
    const { kind: bodyKind, comments: bodyComments } = this.body;
    return [
      'if (',
      printSeparatedItem(print('condition')),
      ')',
      printIndentedGroupOrSpacedDocument(
        print('body'),
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
            print('elseBranch')
          ]
        : ''
    ];
  }
}
