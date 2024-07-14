import { SlangNode } from './SlangNode.js';

export class NumberUnit extends SlangNode {
  variant;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return this.variant;
  }
}
