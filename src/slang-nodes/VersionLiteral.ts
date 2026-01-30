import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class VersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.VersionLiteral;

  variant: SimpleVersionLiteral | TerminalNode;

  constructor(ast: ast.VersionLiteral, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = new SimpleVersionLiteral(variant, collected);

    this.updateMetadata(this.variant);
  }
}
