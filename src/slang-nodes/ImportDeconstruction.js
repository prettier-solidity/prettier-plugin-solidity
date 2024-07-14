import { SlangNode } from './SlangNode.js';

export class ImportDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  fromKeyword;

  path;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.symbols = parse(ast.symbols, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.fromKeyword = ast.fromKeyword.text;
    this.path = parse(ast.path, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      this.openBrace,
      path.call(print, 'symbols'),
      `${this.closeBrace} ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
