import { SlangNode } from './SlangNode.js';

export class UsingDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.symbols = parse(ast.symbols, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
