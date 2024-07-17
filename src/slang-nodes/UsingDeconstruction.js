import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

export class UsingDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBrace, symbols, closeBrace } = ast;
      this.openBrace = openBrace.text;
      this.symbols = new UsingDeconstructionSymbols(
        symbols,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
