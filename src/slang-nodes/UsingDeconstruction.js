import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

export class UsingDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBrace, symbols, closeBrace } = ast;
      this.openBrace = openBrace.text;
      this.symbols = new UsingDeconstructionSymbols(
        symbols,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
