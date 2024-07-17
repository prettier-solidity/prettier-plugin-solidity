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

    const fetch = (childrenOffsets) => ({
      constructorKeyword: ast.constructorKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new ConstructorAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
      body: new Block(ast.body, childrenOffsets.shift(), comments, options)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
