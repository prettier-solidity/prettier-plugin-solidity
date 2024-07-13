import { SlangNode } from './SlangNode.js';

export class YulLeaveStatement extends SlangNode {
  leaveKeyword;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.leaveKeyword = ast.leaveKeyword.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: YulLeaveStatement'];
  }
}
