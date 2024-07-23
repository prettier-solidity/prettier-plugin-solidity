import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { ReceiveFunctionAttributes } from './ReceiveFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

export class ReceiveFunctionDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.ReceiveFunctionDefinition;
  }

  receiveKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      receiveKeyword: ast.receiveKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        offsets[0],
        options
      ),
      attributes: new ReceiveFunctionAttributes(
        ast.attributes,
        offsets[1],
        options
      ),
      body: new FunctionBody(ast.body, offsets[2], options)
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
