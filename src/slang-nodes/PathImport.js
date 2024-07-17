import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      path: new StringLiteral(
        ast.path,
        childrenOffsets.shift(),
        comments,
        options
      ),
      alias: ast.alias
        ? new ImportAlias(ast.alias, childrenOffsets.shift(), comments, options)
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
