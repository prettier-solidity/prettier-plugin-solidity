import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';

import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.YulLiteral,
  YulLiteral
>([
  [ast.HexStringLiteral, HexStringLiteral],
  [ast.StringLiteral, StringLiteral]
]);

export class YulLiteral extends PolymorphicNode<
  ast.YulLiteral,
  HexStringLiteral | StringLiteral | TerminalNode
> {
  readonly kind = NonterminalKind.YulLiteral;

  constructor(ast: ast.YulLiteral, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
