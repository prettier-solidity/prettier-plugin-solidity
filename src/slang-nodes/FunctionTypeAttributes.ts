import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FunctionTypeAttributes extends AttributesCollection<
  ast.FunctionTypeAttributes,
  FunctionTypeAttribute
> {
  readonly kind = NonterminalKind.FunctionTypeAttributes;

  constructor(ast: ast.FunctionTypeAttributes, collected: CollectedMetadata) {
    super(ast, collected, FunctionTypeAttribute);
  }
}
