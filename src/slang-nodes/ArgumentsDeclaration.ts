import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  comments;

  loc;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(ast: ast.ArgumentsDeclaration, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

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

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ArgumentsDeclaration>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
