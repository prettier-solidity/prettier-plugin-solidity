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

    const fetch = (childrenOffsets) => {
      const { functionKeyword, parameters, attributes, returns } = ast;
      this.functionKeyword = functionKeyword.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.attributes = new FunctionTypeAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        options
      );
      if (returns) {
        this.returns = new ReturnsDeclaration(
          returns,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
