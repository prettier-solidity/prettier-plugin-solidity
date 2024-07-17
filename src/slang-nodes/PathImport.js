import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { ImportAlias } from './ImportAlias.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { path, alias } = ast;
      this.path = new StringLiteral(
        path,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.alias =
        typeof alias === 'undefined'
          ? undefined
          : new ImportAlias(
              alias,
              childrenOffsets.shift(),
              comments,
              parse,
              options
            );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
