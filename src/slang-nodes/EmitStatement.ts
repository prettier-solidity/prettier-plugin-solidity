import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class EmitStatement implements SlangNode {
  readonly kind = NonterminalKind.EmitStatement;

  comments;

  loc;

  emitKeyword: string;

  event: IdentifierPath;

  arguments: ArgumentsDeclaration;

  semicolon: string;

  constructor(
    ast: ast.EmitStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.emitKeyword = ast.emitKeyword.text;
    this.event = new IdentifierPath(ast.event, offsets[0]);
    this.arguments = new ArgumentsDeclaration(
      ast.arguments,
      offsets[1],
      options
    );
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.event, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<EmitStatement>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.emitKeyword} `,
      path.call(print, 'event'),
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
