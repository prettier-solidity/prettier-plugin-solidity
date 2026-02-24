import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ArgumentsDeclaration,
  ArgumentsDeclaration
>([
  [slangAst.PositionalArgumentsDeclaration, PositionalArgumentsDeclaration],
  [slangAst.NamedArgumentsDeclaration, NamedArgumentsDeclaration]
]);

export class ArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(
    ast: slangAst.ArgumentsDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `ArgumentsDeclaration` in the `createNonterminalVariant` function
      // above.
      ((variant: slangAst.ArgumentsDeclaration['variant']): void => {
        if (variant instanceof slangAst.PositionalArgumentsDeclaration) return;
        if (variant instanceof slangAst.NamedArgumentsDeclaration) return;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
