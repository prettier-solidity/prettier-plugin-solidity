const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, options: ParserOptions<AstNode>) {
    super(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.PositionalArgumentsDeclaration:
        this.variant = new PositionalArgumentsDeclaration(
          ast.variant as ast.PositionalArgumentsDeclaration,
          options
        );
        break;
      case NonterminalKind.NamedArgumentsDeclaration:
        this.variant = new NamedArgumentsDeclaration(
          ast.variant as ast.NamedArgumentsDeclaration,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ArgumentsDeclaration>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
