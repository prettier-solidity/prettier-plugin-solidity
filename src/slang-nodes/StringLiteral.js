import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class StringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.variant = printString(ast.variant.text.slice(1, -1), options);
    this.initiateLoc(ast);
  }

  print() {
    return this.variant;
  }
}
