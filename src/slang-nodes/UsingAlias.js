import { SlangNode } from './SlangNode.js';

export class UsingAlias extends SlangNode {
  asKeyword;

  operator;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.asKeyword = ast.asKeyword.text;
    this.operator = parse(ast.operator, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
