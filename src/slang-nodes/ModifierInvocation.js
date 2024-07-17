import { isComment } from '../slang-utils/is-comment.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class ModifierInvocation extends SlangNode {
  name;

  arguments;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: new IdentifierPath(
        ast.name,
        childrenOffsets.shift(),
        comments,
        options
      ),
      arguments: ast.arguments
        ? new ArgumentsDeclaration(
            ast.arguments,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);

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
