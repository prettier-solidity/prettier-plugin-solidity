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

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      symbols: new ImportDeconstructionSymbols(
        ast.symbols,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text,
      fromKeyword: ast.fromKeyword.text,
      path: new StringLiteral(
        ast.path,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
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
