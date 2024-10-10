import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EventDefinition implements SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  comments;

  loc;

  name: Identifier;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  constructor(
    ast: ast.EventDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    this.parameters = new EventParametersDeclaration(
      ast.parameters,
      offsets[1],
      options
    );
    this.anonymousKeyword = ast.anonymousKeyword?.unparse();

    metadata = updateMetadata(metadata, [this.parameters]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EventDefinition>, print: PrintFunction): Doc {
    return [
      'event ',
      path.call(print, 'name'),
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ' anonymous' : '',
      ';'
    ];
  }
}
