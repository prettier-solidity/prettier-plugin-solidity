import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new IdentifierPath(
        ast.typeName,
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
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
