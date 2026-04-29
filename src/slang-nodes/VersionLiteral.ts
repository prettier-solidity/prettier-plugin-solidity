import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class VersionLiteral extends PolymorphicNode<
  ast.VersionLiteral,
  SimpleVersionLiteral | TerminalNode
> {
  readonly kind = NonterminalKind.VersionLiteral;

  constructor(ast: ast.VersionLiteral, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new SimpleVersionLiteral(variant, collected)
    );
  }
}
