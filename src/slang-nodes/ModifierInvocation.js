import { isComment } from '../slang-utils/is-comment.js';
import { SlangNode } from './SlangNode.js';

export class ModifierInvocation extends SlangNode {
  name;

  arguments;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.cleanModifierInvocationArguments = () => {
      if (
        this.arguments &&
        this.arguments.variant.kind === 'PositionalArgumentsDeclaration' &&
        this.arguments.variant.arguments.items.length === 0 && // no arguments
        !ast.arguments.variant.cst.children().some((child) => isComment(child)) // no comments
      ) {
        this.arguments = undefined;
      }
    };
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
