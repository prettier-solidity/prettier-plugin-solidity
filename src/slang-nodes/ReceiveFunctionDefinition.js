import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ReceiveFunctionDefinition extends SlangNode {
  receiveKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.cleanModifierInvocationArguments();
    this.initializeLoc(ast);
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
