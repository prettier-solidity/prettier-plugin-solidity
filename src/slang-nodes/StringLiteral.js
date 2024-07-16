import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class StringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.variant = printString(this.variant.slice(1, -1), options);
  }

  print() {
    return this.variant;
  }
}
