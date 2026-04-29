import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.UsingClause,
  UsingClause
>([
  [ast.IdentifierPath, IdentifierPath],
  [ast.UsingDeconstruction, UsingDeconstruction]
]);

export class UsingClause extends PolymorphicNonterminalNode<
  ast.UsingClause,
  IdentifierPath | UsingDeconstruction
> {
  readonly kind = NonterminalKind.UsingClause;

  constructor(ast: ast.UsingClause, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
