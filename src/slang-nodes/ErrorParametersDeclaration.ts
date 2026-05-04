import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ErrorParameters } from './ErrorParameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ErrorParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ErrorParametersDeclaration;

  parameters: ErrorParameters;

  constructor(
    ast: ast.ErrorParametersDeclaration,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.parameters = new ErrorParameters(ast.parameters, collected);

    this.updateMetadata(this.parameters);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('parameters'), ')'];
  }
}
