import { SlangNode } from './SlangNode.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

export class ImportDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  fromKeyword;

  path;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBrace, symbols, closeBrace, fromKeyword, path } = ast;
      this.openBrace = openBrace.text;
      this.symbols = new ImportDeconstructionSymbols(
        symbols,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeBrace = closeBrace.text;
      this.fromKeyword = fromKeyword.text;
      this.path = new StringLiteral(
        path,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      this.openBrace,
      path.call(print, 'symbols'),
      `${this.closeBrace} ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
