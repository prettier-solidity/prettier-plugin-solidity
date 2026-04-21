import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { StatementWithIndentedBody } from './StatementWithIndentedBody.js';
import { Expression } from './Expression.js';
import { ElseBranch } from './ElseBranch.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class IfStatement extends StatementWithIndentedBody {
  readonly kind = NonterminalKind.IfStatement;

  condition: Expression['variant'];

  elseBranch?: ElseBranch;

  constructor(ast: ast.IfStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.condition = extractVariant(new Expression(ast.condition, collected));
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
      this.printBody(
        print,
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
