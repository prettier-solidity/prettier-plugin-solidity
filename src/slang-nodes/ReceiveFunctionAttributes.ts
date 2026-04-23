import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { AttributesCollection } from './AttributesCollection.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ReceiveFunctionAttributes extends AttributesCollection<
  ast.ReceiveFunctionAttributes,
  ReceiveFunctionAttribute
> {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, ReceiveFunctionAttribute);
  }
}
