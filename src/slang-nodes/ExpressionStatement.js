import { SlangNode } from './SlangNode.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
