import { SlangNode } from './SlangNode.js';

export class RevertStatement extends SlangNode {
  revertKeyword;

  error;

  arguments;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.revertKeyword = ast.revertKeyword.text;
    if (ast.error) {
      this.error = parse(ast.error, this.nextChildOffset);
    }
    this.arguments = parse(ast.arguments, this.nextChildOffset);
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
