import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ConstructorAttributes } from './ConstructorAttributes.js';
import { Block } from './Block.js';

export class ConstructorDefinition extends SlangNode {
  constructorKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { constructorKeyword, parameters, attributes, body } = ast;
      this.constructorKeyword = constructorKeyword.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.attributes = new ConstructorAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.body = new Block(body, childrenOffsets.shift(), comments, options);
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
