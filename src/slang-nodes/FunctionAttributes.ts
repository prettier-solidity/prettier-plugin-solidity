import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { FunctionAttribute } from './FunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FunctionAttributes extends AttributesCollection<
  ast.FunctionAttributes,
  FunctionAttribute
> {
  readonly kind = NonterminalKind.FunctionAttributes;

  constructor(ast: ast.FunctionAttributes, collected: CollectedMetadata) {
    super(ast, collected, FunctionAttribute);
  }
}
