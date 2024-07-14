import { SlangNode } from './SlangNode.js';

export class EmitStatement extends SlangNode {
  emitKeyword;

  event;

  arguments;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.emitKeyword = ast.emitKeyword.text;
    this.event = parse(ast.event, this.nextChildOffset);
    this.arguments = parse(ast.arguments, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
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
