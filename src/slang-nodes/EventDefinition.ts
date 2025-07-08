import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class EventDefinition extends SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  name: Identifier;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  constructor(ast: ast.EventDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.parameters = new EventParametersDeclaration(ast.parameters, options);
    this.anonymousKeyword = ast.anonymousKeyword?.unparse();

    this.updateMetadata([this.parameters]);
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
