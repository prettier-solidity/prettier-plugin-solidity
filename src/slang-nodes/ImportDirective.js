import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

export class ImportDirective extends SlangNode {
  get kind() {
    return NonterminalKind.ImportDirective;
  }

  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      importKeyword: ast.importKeyword.text,
      clause: new ImportClause(ast.clause, offsets[0], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
