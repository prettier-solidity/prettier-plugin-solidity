import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class UnicodeStringLiteral extends SlangNode {
  variant;

  constructor({ ast, options, offset }) {
    super(ast, offset);
    this.variant = `unicode${printString(ast.variant.text.slice(8, -1), options)}`;
    this.initiateLoc(ast);
  }

  print() {
    return this.variant;
  }
}
