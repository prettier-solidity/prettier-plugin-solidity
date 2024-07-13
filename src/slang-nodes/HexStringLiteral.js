import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class HexStringLiteral extends SlangNode {
  variant;

  constructor({ ast, options, offset }) {
    super(ast, offset);
    this.variant = `hex${printString(ast.variant.text.slice(4, -1), options)}`;
    this.initiateLoc(ast);
  }

  print() {
    return this.variant;
  }
}
