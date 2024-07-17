import { printString } from '../slang-printers/print-string.js';
import { SlangNode } from './SlangNode.js';

export class HexStringLiteral extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = () => ({
      variant: ast.variant.text
    });

    this.initialize(ast, offset, fetch, comments);

    this.variant = `hex${printString(this.variant.slice(4, -1), options)}`;
  }

  print() {
    return this.variant;
  }
}
