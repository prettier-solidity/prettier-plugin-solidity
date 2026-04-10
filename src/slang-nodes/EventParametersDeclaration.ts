import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { EventParameters } from './EventParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class EventParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.EventParametersDeclaration;

  parameters: EventParameters;

  constructor(
    ast: ast.EventParametersDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.parameters = new EventParameters(ast.parameters, collected, options);

    this.updateMetadata(this.parameters);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('parameters'), ')'];
  }
}
