import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

export class PathImport extends SlangNode {
  get kind() {
    return NonterminalKind.PathImport;
  }

  path;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      path: new StringLiteral(ast.path, offsets[0], options),
      alias: ast.alias
        ? new ImportAlias(ast.alias, offsets[1], options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
