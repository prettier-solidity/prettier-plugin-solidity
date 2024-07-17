import { SlangNode } from './SlangNode.js';

export class MemberAccess extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return this.variant;
  }
}
