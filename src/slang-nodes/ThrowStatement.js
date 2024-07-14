import { SlangNode } from './SlangNode.js';

export class ThrowStatement extends SlangNode {
  throwKeyword;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ThrowStatement'];
  }
}
