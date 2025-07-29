import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class FunctionTypeAttribute extends PolymorphicNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  variant: TerminalNode;

  constructor(ast: ast.FunctionTypeAttribute) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }
}
