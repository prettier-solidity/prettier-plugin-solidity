import { SlangNode } from './SlangNode.js';

export class YulLeaveStatement extends SlangNode {
  leaveKeyword;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulLeaveStatement'];
  }
}
