import { SlangNode } from './SlangNode.js';

export class FunctionName extends SlangNode {
  variant;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print() {
    return this.variant;
  }
}
