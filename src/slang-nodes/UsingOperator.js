import { SlangNode } from './SlangNode.js';

export class UsingOperator extends SlangNode {
  variant;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return this.variant;
  }
}
