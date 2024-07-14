import { printString } from '../common/util.js';
import { SlangNode } from './SlangNode.js';

export class StringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.variant = printString(this.variant.slice(1, -1), options);
    this.initializeLoc(ast);
  }

  print() {
    return this.variant;
  }
}
