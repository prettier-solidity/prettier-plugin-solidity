import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class UnicodeStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.variant = `unicode${printString(this.variant.slice(8, -1), options)}`;
  }

  print() {
    return this.variant;
  }
}
