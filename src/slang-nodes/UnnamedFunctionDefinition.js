import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { UnnamedFunctionAttributes } from './UnnamedFunctionAttributes.js';
import { FunctionBody } from './FunctionBody.js';

export class UnnamedFunctionDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.UnnamedFunctionDefinition;
  }

  functionKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      functionKeyword: ast.functionKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        options
      ),
      attributes: new UnnamedFunctionAttributes(
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
    return printFunction(this.functionKeyword, this, path, print);
  }
}
