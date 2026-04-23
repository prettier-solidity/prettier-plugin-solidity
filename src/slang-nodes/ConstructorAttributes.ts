import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { ConstructorAttribute } from './ConstructorAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ConstructorAttributes extends AttributesCollection<
  ast.ConstructorAttributes,
  ConstructorAttribute
> {
  readonly kind = NonterminalKind.ConstructorAttributes;

  constructor(ast: ast.ConstructorAttributes, collected: CollectedMetadata) {
    super(ast, collected, ConstructorAttribute);
  }
}
