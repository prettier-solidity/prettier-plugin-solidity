import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.ts';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ArgumentsDeclaration,
  ArgumentsDeclaration
>(() => [
  [SlangAst.PositionalArgumentsDeclaration, PositionalArgumentsDeclaration],
  [SlangAst.NamedArgumentsDeclaration, NamedArgumentsDeclaration]
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
