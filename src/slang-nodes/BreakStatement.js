import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
