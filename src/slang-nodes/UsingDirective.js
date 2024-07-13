import { SlangNode } from './SlangNode.js';

export class UsingDirective extends SlangNode {
  usingKeyword;

  clause;

  forKeyword;

  target;

  globalKeyword;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.usingKeyword = ast.usingKeyword.text;
    this.clause = parse(ast.clause, parse, this.nextChildOffset);
    this.forKeyword = ast.forKeyword.text;
    this.target = parse(ast.target, parse, this.nextChildOffset);
    this.globalKeyword = ast.globalKeyword?.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.usingKeyword} `,
      path.call(print, 'clause'),
      ` ${this.forKeyword} `,
      path.call(print, 'target'),
      `${this.globalKeyword ? ` ${this.globalKeyword}` : ''}${this.semicolon}`
    ];
  }
}
