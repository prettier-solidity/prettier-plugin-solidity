import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

export class ImportDeconstruction extends SlangNode {
  get kind() {
    return NonterminalKind.ImportDeconstruction;
  }

  openBrace;

  symbols;

  closeBrace;

  fromKeyword;

  path;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      symbols: new ImportDeconstructionSymbols(
        ast.symbols,
        childrenOffsets.shift(),
        options
      ),
      closeBrace: ast.closeBrace.text,
      fromKeyword: ast.fromKeyword.text,
      path: new StringLiteral(ast.path, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
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
