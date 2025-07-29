import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class FunctionName extends PolymorphicNode {
  readonly kind = NonterminalKind.FunctionName;

  variant: TerminalNode;

  constructor(ast: ast.FunctionName) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }
}
