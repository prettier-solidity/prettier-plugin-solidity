import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.VersionExpression,
  VersionExpression
>([
  [ast.VersionRange, VersionRange],
  [ast.VersionTerm, VersionTerm]
]);

export class VersionExpression extends PolymorphicNonterminalNode<
  ast.VersionExpression,
  VersionRange | VersionTerm
> {
  readonly kind = NonterminalKind.VersionExpression;

  constructor(ast: ast.VersionExpression, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
