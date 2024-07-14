import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class HexStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.variant = `hex${printString(this.variant.slice(4, -1), options)}`;
    this.initializeLoc(ast);
  }

  print() {
    return this.variant;
  }
}
