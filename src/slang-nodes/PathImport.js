import { SlangNode } from './SlangNode.js';

export class PathImport extends SlangNode {
  path;

  alias;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.path = parse(ast.path, parse, this.nextChildOffset);
    this.alias = ast.alias
      ? parse(ast.alias, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'path'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
