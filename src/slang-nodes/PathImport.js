import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      path: new StringLiteral(ast.path, childrenOffsets.shift(), options),
      alias: ast.alias
        ? new ImportAlias(ast.alias, childrenOffsets.shift(), options)
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
