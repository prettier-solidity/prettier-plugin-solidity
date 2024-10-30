import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printFunction } from '../slang-printers/print-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionTypeAttributes } from './FunctionTypeAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class FunctionType implements SlangNode {
  readonly kind = NonterminalKind.FunctionType;

  comments;

  loc;

  parameters: ParametersDeclaration;

  attributes: FunctionTypeAttributes;

  returns?: ReturnsDeclaration;

  constructor(
    ast: ast.FunctionType,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.parameters = new ParametersDeclaration(
      ast.parameters,
      offsets[0],
      options
    );
    this.attributes = new FunctionTypeAttributes(ast.attributes, offsets[1]);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, offsets[2], options);
    }

    metadata = updateMetadata(metadata, [
      this.parameters,
      this.attributes,
      this.returns
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<FunctionType>, print: PrintFunction): Doc {
    return printFunction('function', this, path, print);
  }
}
