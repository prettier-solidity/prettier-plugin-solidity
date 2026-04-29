import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class ExperimentalFeature extends PolymorphicNode<
  ast.ExperimentalFeature,
  StringLiteral | TerminalNode
> {
  readonly kind = NonterminalKind.ExperimentalFeature;

  constructor(ast: ast.ExperimentalFeature, collected: CollectedMetadata) {
    super(ast, collected, (variant) => new StringLiteral(variant, collected));
  }
}
