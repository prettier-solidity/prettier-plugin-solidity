import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.ts';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ArgumentsDeclaration,
  ArgumentsDeclaration
>([
  [ast.PositionalArgumentsDeclaration, PositionalArgumentsDeclaration],
  [ast.NamedArgumentsDeclaration, NamedArgumentsDeclaration]
]);

export class ArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
