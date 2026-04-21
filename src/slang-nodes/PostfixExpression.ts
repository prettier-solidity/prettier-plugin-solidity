import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { UnaryExpression } from './UnaryExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class PostfixExpression extends UnaryExpression {
  readonly kind = NonterminalKind.PostfixExpression;

  constructor(ast: ast.PostfixExpression, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(print: PrintFunction): Doc {
    return [print('operand'), this.operator];
  }
}
