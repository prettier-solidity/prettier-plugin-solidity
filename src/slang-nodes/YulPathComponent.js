import { SlangNode } from './SlangNode.js';

export class YulPathComponent extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return this.variant;
  }
}
