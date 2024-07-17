import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

export class UnnamedFunctionDefinition extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { functionKeyword, parameters, attributes, body } = ast;
      this.functionKeyword = functionKeyword.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.attributes = new UnnamedFunctionAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.body = new FunctionBody(
        body,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);

    this.cleanModifierInvocationArguments();
  }

  cleanModifierInvocationArguments() {
    this.attributes.items.forEach((attribute) => {
      if (attribute.variant.kind === 'ModifierInvocation') {
        attribute.variant.cleanModifierInvocationArguments();
      }
    });
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
