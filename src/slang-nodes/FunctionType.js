import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FunctionTypeAttributes } from './FunctionTypeAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';

export class FunctionType extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  returns;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      functionKeyword: ast.functionKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new FunctionTypeAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(
            ast.returns,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
