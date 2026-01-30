import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class StateVariableAttribute extends SlangNode {
  readonly kind = NonterminalKind.StateVariableAttribute;

  variant: OverrideSpecifier | TerminalNode;

  constructor(ast: ast.StateVariableAttribute, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new OverrideSpecifier(variant, collected);

    this.updateMetadata(this.variant);
  }
}
