import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Pragma } from './Pragma.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class PragmaDirective implements SlangNode {
  readonly kind = NonterminalKind.PragmaDirective;

  comments;

  loc;

  pragmaKeyword: string;

  pragma: Pragma;

  semicolon: string;

  constructor(
    ast: ast.PragmaDirective,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.pragmaKeyword = ast.pragmaKeyword.text;
    this.pragma = new Pragma(ast.pragma, offsets[0], options);
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.pragma]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<PragmaDirective>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
