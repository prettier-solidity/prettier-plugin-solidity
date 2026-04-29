import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicTerminalNode } from './PolymorphicTerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FunctionTypeAttribute extends PolymorphicTerminalNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  constructor(ast: ast.FunctionTypeAttribute, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
