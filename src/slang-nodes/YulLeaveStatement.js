import { SlangNode } from './SlangNode.js';

export class YulLeaveStatement extends SlangNode {
  leaveKeyword;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { leaveKeyword } = ast;
      this.leaveKeyword = leaveKeyword.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulLeaveStatement'];
  }
}
