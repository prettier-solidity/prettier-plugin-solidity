import { isComment } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ModifierInvocation extends SlangNode {
  #ast;

  name;

  arguments;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.#ast = ast;
    this.initialize(ast, parse);
    this.finalize(ast);
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
