import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.YulLiteral['variant'], SlangTerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<YulLiteral['variant'], TerminalNode> {
  if (variant instanceof ast.HexStringLiteral) {
    return new HexStringLiteral(variant, options);
  }
  if (variant instanceof ast.StringLiteral) {
    return new StringLiteral(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class YulLiteral extends SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | TerminalNode;

  constructor(ast: ast.YulLiteral, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }
}
