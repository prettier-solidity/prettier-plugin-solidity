import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class EmitStatement extends SlangNode {
  emitKeyword;

  event;

  arguments;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      emitKeyword: ast.emitKeyword.text,
      event: new IdentifierPath(
        ast.event,
        childrenOffsets.shift(),
        comments,
        options
      ),
      arguments: new ArgumentsDeclaration(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.emitKeyword} `,
      path.call(print, 'event'),
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
