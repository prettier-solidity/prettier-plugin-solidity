import { SlangNode } from './SlangNode.js';

export class NamedArgumentGroup extends SlangNode {
  openBrace;

  arguments;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.arguments = parse(ast.arguments, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
