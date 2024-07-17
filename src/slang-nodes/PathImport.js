import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { path, alias } = ast;
      this.path = new StringLiteral(
        path,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.alias =
        typeof alias === 'undefined'
          ? undefined
          : new ImportAlias(alias, childrenOffsets.shift(), comments, options);
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
