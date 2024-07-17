import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class StringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, fetch, comments);

    this.variant = printString(this.variant.slice(1, -1), options);
  }

  print() {
    return this.variant;
  }
}
