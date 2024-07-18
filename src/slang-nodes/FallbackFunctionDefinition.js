import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

export class FallbackFunctionDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.FallbackFunctionDefinition;
  }

  fallbackKeyword;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      fallbackKeyword: ast.fallbackKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        options
      ),
      attributes: new FallbackFunctionAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(ast.returns, childrenOffsets.shift(), options)
        : undefined,
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
    return printFunction(this.fallbackKeyword, this, path, print);
  }
}
