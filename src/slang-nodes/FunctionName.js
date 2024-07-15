import { SlangNode } from './SlangNode.js';

export class FunctionName extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return this.variant;
  }
}
