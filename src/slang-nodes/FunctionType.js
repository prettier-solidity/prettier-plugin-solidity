import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionTypeAttributes } from './FunctionTypeAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';

export class FunctionType extends SlangNode {
  get kind() {
    return NonterminalKind.FunctionType;
  }

  functionKeyword;

  parameters;

  attributes;

  returns;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      functionKeyword: ast.functionKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        offsets[0],
        options
      ),
      attributes: new FunctionTypeAttributes(
        ast.attributes,
        offsets[1],
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(ast.returns, offsets[2], options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
