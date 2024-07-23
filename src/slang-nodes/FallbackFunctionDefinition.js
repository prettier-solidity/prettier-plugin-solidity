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

    const fetch = (offsets) => {
      let i = 1;
      const children = {
        fallbackKeyword: ast.fallbackKeyword.text,
        parameters: new ParametersDeclaration(
          ast.parameters,
          offsets[0],
          options
        ),
        attributes: new FallbackFunctionAttributes(
          ast.attributes,
          offsets[1],
          options
        ),
        returns: ast.returns
          ? new ReturnsDeclaration(ast.returns, offsets[(i += 1)], options)
          : undefined,
        body: new FunctionBody(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

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
