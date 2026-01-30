import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { EventParametersDeclaration } from './EventParametersDeclaration.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class EventDefinition extends SlangNode {
  readonly kind = NonterminalKind.EventDefinition;

  name: TerminalNode;

  parameters: EventParametersDeclaration;

  anonymousKeyword?: string;

  constructor(
    ast: ast.EventDefinition,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.name = new TerminalNode(ast.name, collected);
    this.parameters = new EventParametersDeclaration(
      ast.parameters,
      collected,
      options
    );
    this.anonymousKeyword = ast.anonymousKeyword?.unparse();

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<EventDefinition>, print: PrintFunction): Doc {
    return [
      'event ',
      path.call(print, 'name'),
      path.call(print, 'parameters'),
      this.anonymousKeyword ? ' anonymous;' : ';'
    ];
  }
}
