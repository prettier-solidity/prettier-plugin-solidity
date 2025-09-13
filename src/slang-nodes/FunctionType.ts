import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionTypeAttributes } from './FunctionTypeAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class FunctionType extends SlangNode {
  readonly kind = NonterminalKind.FunctionType;

  parameters: ParametersDeclaration;

  attributes: FunctionTypeAttributes;

  returns?: ReturnsDeclaration;

  constructor(ast: ast.FunctionType, options: ParserOptions<AstNode>) {
    super(ast);

    this.parameters = new ParametersDeclaration(ast.parameters, options);
    this.attributes = new FunctionTypeAttributes(ast.attributes);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, options);
    }

    this.updateMetadata(this.parameters, this.attributes, this.returns);
  }

  print(path: AstPath<FunctionType>, print: PrintFunction): Doc {
    return printFunction('function', this, path, print);
  }
}
