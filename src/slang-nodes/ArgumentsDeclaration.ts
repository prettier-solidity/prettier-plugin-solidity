import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.ArgumentsDeclaration['variant'],
  options: ParserOptions<AstNode>
): ArgumentsDeclaration['variant'] {
  if (variant instanceof ast.PositionalArgumentsDeclaration) {
    return new PositionalArgumentsDeclaration(variant, options);
  }
  if (variant instanceof ast.NamedArgumentsDeclaration) {
    return new NamedArgumentsDeclaration(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class ArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
