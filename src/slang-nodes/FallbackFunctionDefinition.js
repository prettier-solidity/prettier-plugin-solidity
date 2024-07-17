import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';
import { FallbackFunctionAttributes } from './FallbackFunctionAttributes.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { FunctionBody } from './FunctionBody.js';

export class FallbackFunctionDefinition extends SlangNode {
  fallbackKeyword;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { fallbackKeyword, parameters, attributes, returns, body } = ast;
      this.fallbackKeyword = fallbackKeyword.text;
      this.parameters = new ParametersDeclaration(
        parameters,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.attributes = new FallbackFunctionAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      if (returns) {
        this.returns = new ReturnsDeclaration(
          returns,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.body = new FunctionBody(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);

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
