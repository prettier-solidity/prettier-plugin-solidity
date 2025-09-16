import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class ExperimentalFeature extends SlangNode {
  readonly kind = NonterminalKind.ExperimentalFeature;

  variant: StringLiteral | TerminalNode;

  constructor(ast: ast.ExperimentalFeature, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new StringLiteral(variant, options);

    this.updateMetadata(this.variant);
  }
}
