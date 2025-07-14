import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class ArgumentsDeclaration extends PolymorphicNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.PositionalArgumentsDeclaration:
        this.variant = new PositionalArgumentsDeclaration(
          variant as ast.PositionalArgumentsDeclaration,
          options
        );
        break;
      case NonterminalKind.NamedArgumentsDeclaration:
        this.variant = new NamedArgumentsDeclaration(
          variant as ast.NamedArgumentsDeclaration,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
