import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Parameters } from './Parameters.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ParametersDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ParametersDeclaration;

  parameters: Parameters;

  constructor(ast: ast.ParametersDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.parameters = new Parameters(ast.parameters, collected);

    this.updateMetadata(this.parameters);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('parameters'), ')'];
  }
}
