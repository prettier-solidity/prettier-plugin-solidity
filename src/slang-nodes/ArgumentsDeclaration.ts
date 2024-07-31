import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.ArgumentsDeclaration;

  comments;

  loc;

  variant: PositionalArgumentsDeclaration | NamedArgumentsDeclaration;

  constructor(
    ast: ast.ArgumentsDeclaration,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.PositionalArgumentsDeclaration:
        this.variant = new PositionalArgumentsDeclaration(
          ast.variant as ast.PositionalArgumentsDeclaration,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.NamedArgumentsDeclaration:
        this.variant = new NamedArgumentsDeclaration(
          ast.variant as ast.NamedArgumentsDeclaration,
          offsets[0],
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

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
