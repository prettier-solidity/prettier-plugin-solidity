import { SlangNode } from './SlangNode.js';
import { OverridePaths } from './OverridePaths.js';

export class OverridePathsDeclaration extends SlangNode {
  openParen;

  paths;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, paths, closeParen } = ast;
      this.openParen = openParen.text;
      this.paths = new OverridePaths(
        paths,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePathsDeclaration'];
  }
}
