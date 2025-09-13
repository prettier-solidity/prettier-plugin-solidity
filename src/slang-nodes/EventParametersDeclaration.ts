import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { EventParameters } from './EventParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class EventParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.EventParametersDeclaration;

  parameters: EventParameters;

  constructor(
    ast: ast.EventParametersDeclaration,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.parameters = new EventParameters(ast.parameters, options);

    this.updateMetadata(this.parameters);
  }

  print(path: AstPath<EventParametersDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'parameters'), ')'];
  }
}
