import { SlangNode } from './SlangNode.js';

export class UsingDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
