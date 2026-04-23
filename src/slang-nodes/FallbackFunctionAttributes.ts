import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FallbackFunctionAttributes extends AttributesCollection<
  ast.FallbackFunctionAttributes,
  FallbackFunctionAttribute
> {
  readonly kind = NonterminalKind.FallbackFunctionAttributes;

  constructor(
    ast: ast.FallbackFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, FallbackFunctionAttribute);
  }
}
