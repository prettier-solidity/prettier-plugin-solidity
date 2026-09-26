import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { IdentifierPath } from './IdentifierPath.ts';
import { UsingDeconstruction } from './UsingDeconstruction.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.UsingClause,
  UsingClause
>([
  [ast.IdentifierPath, IdentifierPath],
  [ast.UsingDeconstruction, UsingDeconstruction]
]);

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
