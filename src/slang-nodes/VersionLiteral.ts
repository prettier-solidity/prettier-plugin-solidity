import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class VersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.VersionLiteral;

  variant: SimpleVersionLiteral | TerminalNode;

  constructor(ast: ast.VersionLiteral) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new SimpleVersionLiteral(variant);

    this.updateMetadata(this.variant);
  }
}
