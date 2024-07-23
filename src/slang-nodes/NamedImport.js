import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

export class NamedImport extends SlangNode {
  get kind() {
    return NonterminalKind.NamedImport;
  }

  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      asterisk: ast.asterisk.text,
      alias: new ImportAlias(ast.alias, offsets[0], options),
      fromKeyword: ast.fromKeyword.text,
      path: new StringLiteral(ast.path, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      this.asterisk,
      path.call(print, 'alias'),
      ` ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
