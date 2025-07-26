import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.ArgumentsDeclaration['variant'],
  options: ParserOptions<AstNode>
): ArgumentsDeclaration['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.PositionalArgumentsDeclaration:
      return new PositionalArgumentsDeclaration(
        variant as ast.PositionalArgumentsDeclaration,
        options
      );
    case NonterminalKind.NamedArgumentsDeclaration:
      return new NamedArgumentsDeclaration(
        variant as ast.NamedArgumentsDeclaration,
        options
      );
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class ArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ArgumentsDeclaration>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
