import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.ArgumentsDeclaration,
  ArgumentsDeclaration
>([
  [ast.PositionalArgumentsDeclaration, PositionalArgumentsDeclaration],
  [ast.NamedArgumentsDeclaration, NamedArgumentsDeclaration]
]);

export class ArgumentsDeclaration extends PolymorphicNonterminalNode<
  ast.ArgumentsDeclaration,
  PositionalArgumentsDeclaration | NamedArgumentsDeclaration
> {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
