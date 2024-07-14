import { SlangNode } from './SlangNode.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.path = parse(ast.path, this.nextChildOffset);
    if (ast.alias) {
      this.alias = parse(ast.alias, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
