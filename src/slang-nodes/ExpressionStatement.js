import { SlangNode } from './SlangNode.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.expression = parse(ast.expression, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
