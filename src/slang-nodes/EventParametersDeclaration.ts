import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParameters } from './EventParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class EventParametersDeclaration implements SlangNode {
  readonly kind = NonterminalKind.EventParametersDeclaration;

  comments;

  loc;

  openParen: string;

  parameters: EventParameters;

  closeParen: string;

  constructor(
    ast: ast.EventParametersDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.parameters = new EventParameters(ast.parameters, offsets[0], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<EventParametersDeclaration>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
