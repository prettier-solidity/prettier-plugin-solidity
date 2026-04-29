import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class NumberUnit extends PolymorphicString {
  readonly kind = NonterminalKind.NumberUnit;

  constructor(ast: ast.NumberUnit, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
