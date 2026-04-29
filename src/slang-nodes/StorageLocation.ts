import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicString } from './PolymorphicString.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class StorageLocation extends PolymorphicString {
  readonly kind = NonterminalKind.StorageLocation;

  constructor(ast: ast.StorageLocation, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
