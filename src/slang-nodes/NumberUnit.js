import { SlangNode } from './SlangNode.js';

export class NumberUnit extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return this.variant;
  }
}
