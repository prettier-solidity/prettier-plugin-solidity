import { SlangNode } from './SlangNode.js';

export class MemberAccess extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.variant = ast.variant.text;
    this.initiateLoc(ast);
  }

  print() {
    return this.variant;
  }
}
