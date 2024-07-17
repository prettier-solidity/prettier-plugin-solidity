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

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      receiveKeyword: ast.receiveKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        options
      ),
      attributes: new ReceiveFunctionAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        options
      ),
      body: new FunctionBody(ast.body, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);

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
