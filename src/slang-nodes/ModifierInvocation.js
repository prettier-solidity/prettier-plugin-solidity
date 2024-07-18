import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { isComment } from '../slang-utils/is-comment.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class ModifierInvocation extends SlangNode {
  get kind() {
    return NonterminalKind.ModifierInvocation;
  }

  name;

  arguments;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: new IdentifierPath(ast.name, childrenOffsets.shift(), options),
      arguments: ast.arguments
        ? new ArgumentsDeclaration(
            ast.arguments,
            childrenOffsets.shift(),
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch);

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
