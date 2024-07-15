import { SlangNode } from './SlangNode.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
