import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class UnicodeStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = () => {
      const { variant } = ast;
      this.variant = variant.text;
    };

    this.initialize(ast, offset, fetch, comments);

    this.variant = `unicode${printString(this.variant.slice(8, -1), options)}`;
  }

  print() {
    return this.variant;
  }
}
