import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName } = ast;
      this.typeName = new IdentifierPath(
        typeName,
        childrenOffsets.shift(),
        comments,
        options
      );
      if (ast.arguments) {
        this.arguments = new ArgumentsDeclaration(
          ast.arguments,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
