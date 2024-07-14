import { SlangNode } from './SlangNode.js';

export class YulBlock extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.statements = parse(ast.statements, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
