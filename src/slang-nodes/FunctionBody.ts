import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class FunctionBody extends PolymorphicNode<
  ast.FunctionBody,
  Block | TerminalNode
> {
  readonly kind = NonterminalKind.FunctionBody;

  constructor(ast: ast.FunctionBody, collected: CollectedMetadata) {
    super(ast, collected, (variant) => new Block(variant, collected));
  }
}
