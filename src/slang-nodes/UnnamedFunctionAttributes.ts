import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class UnnamedFunctionAttributes extends AttributesCollection<
  ast.UnnamedFunctionAttributes,
  UnnamedFunctionAttribute
> {
  readonly kind = NonterminalKind.UnnamedFunctionAttributes;

  constructor(
    ast: ast.UnnamedFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, UnnamedFunctionAttribute);
  }
}
