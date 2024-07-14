import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class UnnamedFunctionDefinition extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.parameters = parse(ast.parameters, this.nextChildOffset);
    this.attributes = parse(ast.attributes, this.nextChildOffset);
    this.body = parse(ast.body, this.nextChildOffset);

    this.cleanModifierInvocationArguments();
    this.initiateLoc(ast);
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
