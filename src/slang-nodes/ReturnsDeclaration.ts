import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { group } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { ParametersDeclaration } from './ParametersDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ReturnsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.ReturnsDeclaration;

  variables: ParametersDeclaration;

  constructor(ast: ast.ReturnsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.variables = new ParametersDeclaration(ast.variables, collected);

    this.updateMetadata(this.variables);
  }

  print(print: PrintFunction): Doc {
    return ['returns ', group(print('variables'))];
  }
}
