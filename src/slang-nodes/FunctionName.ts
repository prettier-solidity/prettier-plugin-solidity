import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicTerminalNode } from './PolymorphicTerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class FunctionName extends PolymorphicTerminalNode {
  readonly kind = NonterminalKind.FunctionName;

  constructor(ast: ast.FunctionName, collected: CollectedMetadata) {
    super(ast, collected);
  }
}
