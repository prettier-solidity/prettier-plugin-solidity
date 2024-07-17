import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

export class UsingDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      symbols: new UsingDeconstructionSymbols(
        ast.symbols,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
