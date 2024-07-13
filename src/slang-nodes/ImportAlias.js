import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  asKeyword;

  identifier;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.asKeyword = ast.asKeyword.text;
    this.identifier = ast.identifier.text;
    this.initiateLoc(ast);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
