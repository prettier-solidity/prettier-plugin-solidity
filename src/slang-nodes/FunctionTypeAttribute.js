import { SlangNode } from './SlangNode.js';

export class FunctionTypeAttribute extends SlangNode {
  variant;

  constructor(ast, offset, comments) {
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
