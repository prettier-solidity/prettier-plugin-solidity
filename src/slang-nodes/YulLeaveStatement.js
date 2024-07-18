import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class YulLeaveStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulLeaveStatement;
  }

  leaveKeyword;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      leaveKeyword: ast.leaveKeyword.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: YulLeaveStatement'];
  }
}
