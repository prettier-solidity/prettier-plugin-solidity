import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { HexStringLiteral } from './HexStringLiteral.ts';
import { StringLiteral } from './StringLiteral.ts';
import { TerminalNode } from './TerminalNode.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.YulLiteral,
  YulLiteral
>([
  [ast.HexStringLiteral, HexStringLiteral],
  [ast.StringLiteral, StringLiteral]
]);

export class YulLiteral extends SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | TerminalNode;

  constructor(ast: ast.YulLiteral, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
