import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionTypeAttributes } from './FunctionTypeAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FunctionType extends SlangNode {
  readonly kind = NonterminalKind.FunctionType;

  parameters: ParametersDeclaration;

  attributes: FunctionTypeAttributes;

  returns?: ReturnsDeclaration;

  constructor(ast: ast.FunctionType, collected: CollectedMetadata) {
    super(ast, collected);

    this.parameters = new ParametersDeclaration(ast.parameters, collected);
    this.attributes = new FunctionTypeAttributes(ast.attributes, collected);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, collected);
    }

    this.updateMetadata(this.parameters, this.attributes, this.returns);
  }

  print(print: PrintFunction): Doc {
    return printFunction('function', this, print);
  }
}
