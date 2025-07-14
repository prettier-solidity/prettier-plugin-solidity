import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class StateVariableAttribute extends PolymorphicNode {
  readonly kind = NonterminalKind.StateVariableAttribute;

  variant: OverrideSpecifier | TerminalNode;

  constructor(ast: ast.StateVariableAttribute) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new OverrideSpecifier(variant);

    this.updateMetadata(this.variant);
  }
}
