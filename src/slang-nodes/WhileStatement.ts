import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { StatementWithIndentedBody } from './StatementWithIndentedBody.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class WhileStatement extends StatementWithIndentedBody {
  readonly kind = NonterminalKind.WhileStatement;

  condition: Expression['variant'];

  constructor(ast: ast.WhileStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.condition = extractVariant(new Expression(ast.condition, collected));

    this.updateMetadata(this.condition, this.body);
  }

  print(print: PrintFunction): Doc {
    return [
      'while (',
      printSeparatedItem(print('condition')),
      ')',
      this.printBody(print)
    ];
  }
}
