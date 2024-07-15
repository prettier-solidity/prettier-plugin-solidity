import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';

export class UnnamedFunctionDefinition extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.cleanModifierInvocationArguments();
    this.finalize(ast);
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
