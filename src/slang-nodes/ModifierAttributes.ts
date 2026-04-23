import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { ModifierAttribute } from './ModifierAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ModifierAttributes extends AttributesCollection<
  ast.ModifierAttributes,
  ModifierAttribute
> {
  readonly kind = NonterminalKind.ModifierAttributes;

  constructor(ast: ast.ModifierAttributes, collected: CollectedMetadata) {
    super(ast, collected, ModifierAttribute);
  }
}
