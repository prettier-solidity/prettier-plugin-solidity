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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      fallbackKeyword: ast.fallbackKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new FallbackFunctionAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(
            ast.returns,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      body: new FunctionBody(
        ast.body,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

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
    return printFunction(this.fallbackKeyword, this, path, print);
  }
}
