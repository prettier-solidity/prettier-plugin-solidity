import { SlangNode } from './SlangNode.js';

export class RevertStatement extends SlangNode {
  revertKeyword;

  error;

  arguments;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.revertKeyword = ast.revertKeyword.text;
    this.error = ast.error
      ? parse(ast.error, parse, this.nextChildOffset)
      : undefined;
    this.arguments = parse(ast.arguments, parse, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.revertKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
