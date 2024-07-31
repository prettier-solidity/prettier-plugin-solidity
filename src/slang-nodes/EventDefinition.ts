import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class EventDefinition implements SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  comments;

  loc;

  eventKeyword: string;

  name: string;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  semicolon: string;

  constructor(
    ast: ast.EventDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.eventKeyword = ast.eventKeyword.text;
    this.name = ast.name.text;
    this.parameters = new EventParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );
    this.anonymousKeyword = ast.anonymousKeyword?.text;
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.eventKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ` ${this.anonymousKeyword}` : '',
      this.semicolon
    ];
  }
}
