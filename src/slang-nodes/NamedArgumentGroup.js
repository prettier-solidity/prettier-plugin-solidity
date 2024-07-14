import { SlangNode } from './SlangNode.js';

export class NamedArgumentGroup extends SlangNode {
  openBrace;

  arguments;

  closeBrace;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
