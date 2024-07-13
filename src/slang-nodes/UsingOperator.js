import { SlangNode } from './SlangNode.js';

export class UsingOperator extends SlangNode {
  variant;

  constructor({ ast, offset }) {
    super(ast, offset);
    this.variant = ast.variant.text;
    this.initiateLoc(ast);
  }

  print() {
    return this.variant;
  }
}
