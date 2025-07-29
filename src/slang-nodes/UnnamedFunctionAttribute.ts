import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class UnnamedFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttribute;

  variant: ModifierInvocation | TerminalNode;

  constructor(
    ast: ast.UnnamedFunctionAttribute,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new ModifierInvocation(variant, options);

    this.updateMetadata(this.variant);
  }
}
