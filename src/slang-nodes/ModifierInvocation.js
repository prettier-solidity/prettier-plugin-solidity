import { isComment } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ModifierInvocation extends SlangNode {
  #ast;

  name;

  arguments;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.#ast = ast;
    this.name = parse(ast.name, this.nextChildOffset);
    if (ast.arguments) {
      this.arguments = parse(ast.arguments, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  cleanModifierInvocationArguments() {
    if (
      this.arguments &&
      this.arguments.variant.kind === 'PositionalArgumentsDeclaration' &&
      this.arguments.variant.arguments.items.length === 0 && // no arguments
      !this.#ast.arguments.variant.cst
        .children()
        .some((child) => isComment(child)) // no comments
    ) {
      this.arguments = undefined;
    }
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
