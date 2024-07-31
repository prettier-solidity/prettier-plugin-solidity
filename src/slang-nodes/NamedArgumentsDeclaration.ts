import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class NamedArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentsDeclaration;

  comments;

  loc;

  openParen: string;

  arguments?: NamedArgumentGroup;

  closeParen: string;

  constructor(
    ast: ast.NamedArgumentsDeclaration,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    if (ast.arguments) {
      this.arguments = new NamedArgumentGroup(
        ast.arguments,
        offsets[0],
        options
      );
    }
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
