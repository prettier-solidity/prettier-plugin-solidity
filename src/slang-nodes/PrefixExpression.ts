import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { UnaryExpression } from './UnaryExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class PrefixExpression extends UnaryExpression {
  readonly kind = NonterminalKind.PrefixExpression;

  constructor(ast: ast.PrefixExpression, collected: CollectedMetadata) {
    super(ast, collected);

    if (this.operator === 'delete') {
      this.operator = 'delete ';
    }
  }

  print(print: PrintFunction): Doc {
    return [this.operator, print('operand')];
  }
}
