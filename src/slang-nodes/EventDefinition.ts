import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EventDefinition implements SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  comments;

  loc;

  name: Identifier;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  constructor(ast: ast.EventDefinition) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.parameters = new EventParametersDeclaration(ast.parameters);
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
