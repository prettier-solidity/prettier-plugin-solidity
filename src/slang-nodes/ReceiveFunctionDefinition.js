import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

export class ReceiveFunctionDefinition extends SlangNode {
  receiveKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { receiveKeyword, parameters, attributes, body } = ast;
      this.receiveKeyword = receiveKeyword.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.attributes = new ReceiveFunctionAttributes(
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

    this.initialize(ast, offset, fetch, comments);

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
    return printFunction(this.receiveKeyword, this, path, print);
  }
}
