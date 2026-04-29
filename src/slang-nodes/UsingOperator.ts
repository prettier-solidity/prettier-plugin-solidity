import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class UsingOperator extends PolymorphicString {
  readonly kind = NonterminalKind.UsingOperator;

  constructor(ast: ast.UsingOperator, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
