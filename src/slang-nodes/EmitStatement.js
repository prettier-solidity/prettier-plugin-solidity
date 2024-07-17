import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class EmitStatement extends SlangNode {
  emitKeyword;

  event;

  arguments;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { emitKeyword, event, semicolon } = ast;
      this.emitKeyword = emitKeyword.text;
      this.event = new IdentifierPath(
        event,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.arguments = new ArgumentsDeclaration(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
