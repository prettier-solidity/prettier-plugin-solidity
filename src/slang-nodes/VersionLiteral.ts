import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

export class VersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.VersionLiteral;

  variant: SimpleVersionLiteral | TerminalNode;

  constructor(ast: ast.VersionLiteral, options: ParserOptions<AstNode>) {
    super(ast, options);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, options);
      return;
    }
    this.variant = new SimpleVersionLiteral(variant, options);

    this.updateMetadata(this.variant);
  }
}
