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

    const fetch = (childrenOffsets) => ({
      functionKeyword: ast.functionKeyword.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new UnnamedFunctionAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
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
    return printFunction(this.functionKeyword, this, path, print);
  }
}
