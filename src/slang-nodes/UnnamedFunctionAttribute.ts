import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.ts';
import { ModifierInvocation } from './ModifierInvocation.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class UnnamedFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttribute;

  variant: ModifierInvocation | TerminalNode;

  constructor(ast: ast.UnnamedFunctionAttribute, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new ModifierInvocation(variant, collected);

    this.updateMetadata(this.variant);
  }
}
