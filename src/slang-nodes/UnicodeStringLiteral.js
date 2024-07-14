import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class UnicodeStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.variant = `unicode${printString(this.variant.slice(8, -1), options)}`;
    this.finalize(ast);
  }

  print() {
    return this.variant;
  }
}
