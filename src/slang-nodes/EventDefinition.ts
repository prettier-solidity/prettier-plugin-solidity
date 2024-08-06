import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, PrintFunction, SlangNode } from '../types';

export class EventDefinition implements SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  comments;

  loc;

  name: string;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  constructor(
    ast: ast.EventDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.parameters = new EventParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );
    this.anonymousKeyword = ast.anonymousKeyword?.text;

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EventDefinition>, print: PrintFunction): Doc {
    return [
      `event ${this.name}`,
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ' anonymous' : '',
      ';'
    ];
  }
}
