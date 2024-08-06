import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class EmitStatement implements SlangNode {
  readonly kind = NonterminalKind.EmitStatement;

  comments;

  loc;

  event: IdentifierPath;

  arguments: ArgumentsDeclaration;

  constructor(
    ast: ast.EmitStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.event = new IdentifierPath(ast.event, offsets[0]);
    this.arguments = new ArgumentsDeclaration(
      ast.arguments,
      offsets[1],
      options
    );

    metadata = updateMetadata(metadata, [this.event, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EmitStatement>, print: PrintFunction): Doc {
    return [
      'emit ',
      path.call(print, 'event'),
      path.call(print, 'arguments'),
      ';'
    ];
  }
}
