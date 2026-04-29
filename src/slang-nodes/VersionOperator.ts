import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class VersionOperator extends PolymorphicString {
  readonly kind = NonterminalKind.VersionOperator;

  constructor(ast: ast.VersionOperator, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
