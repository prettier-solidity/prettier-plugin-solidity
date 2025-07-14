import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulLiteral extends PolymorphicNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | TerminalNode;

  constructor(ast: ast.YulLiteral, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.HexStringLiteral:
        this.variant = new HexStringLiteral(
          variant as ast.HexStringLiteral,
          options
        );
        break;
      case NonterminalKind.StringLiteral:
        this.variant = new StringLiteral(variant as ast.StringLiteral, options);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
