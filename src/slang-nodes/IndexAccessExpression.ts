import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printPossibleMemberAccessChainItem } from '../slang-printers/print-member-access-chain-item.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { IndexAccessEnd } from './IndexAccessEnd.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class IndexAccessExpression extends SlangNode {
  readonly kind = NonterminalKind.IndexAccessExpression;

  operand: Expression['variant'];

  start?: Expression['variant'];

  end?: IndexAccessEnd;

  constructor(ast: ast.IndexAccessExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.operand = extractVariant(new Expression(ast.operand, collected));
    if (ast.start) {
      this.start = extractVariant(new Expression(ast.start, collected));
    }
    if (ast.end) {
      this.end = new IndexAccessEnd(ast.end, collected);
    }

    this.updateMetadata(this.operand, this.start, this.end);
  }

  print(print: PrintFunction): Doc {
    return printPossibleMemberAccessChainItem(print('operand'), [
      '[',
      printSeparatedItem([print('start'), print('end')]),
      ']'
    ]);
  }
}
