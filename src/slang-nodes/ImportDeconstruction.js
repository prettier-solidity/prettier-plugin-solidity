import { SlangNode } from './SlangNode.js';

export class ImportDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  fromKeyword;

  path;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.symbols = parse(ast.symbols, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.fromKeyword = ast.fromKeyword.text;
    this.path = parse(ast.path, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      this.openBrace,
      path.call(print, 'symbols'),
      `${this.closeBrace} ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
