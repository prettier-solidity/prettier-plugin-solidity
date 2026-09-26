import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';
import { ReturnsDeclaration } from './ReturnsDeclaration.ts';
import { Block } from './Block.ts';
import { CatchClauses } from './CatchClauses.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TryStatement extends SlangNode {
  readonly kind = NonterminalKind.TryStatement;

  expression: Expression['variant'];

  returns?: ReturnsDeclaration;

  body: Block;

  catchClauses: CatchClauses;

  constructor(ast: ast.TryStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.expression = extractVariant(new Expression(ast.expression, collected));
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, collected);
    }
    this.body = new Block(ast.body, collected);
    this.catchClauses = new CatchClauses(ast.catchClauses, collected);

    this.updateMetadata(
      this.expression,
      this.returns,
      this.body,
      this.catchClauses
    );
  }

  print(print: PrintFunction): Doc {
    const returnsDoc = print('returns');
    return [
      'try',
      printSeparatedItem(print('expression'), {
        firstSeparator: line
      }),
      [
        returnsDoc ? [returnsDoc, ' '] : returnsDoc,
        print('body'),
        ' ',
        print('catchClauses')
      ]
    ];
  }
}
