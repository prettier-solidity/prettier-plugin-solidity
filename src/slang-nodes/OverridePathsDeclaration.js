import { SlangNode } from './SlangNode.js';
import { OverridePaths } from './OverridePaths.js';

export class OverridePathsDeclaration extends SlangNode {
  openParen;

  paths;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      paths: new OverridePaths(
        ast.paths,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePathsDeclaration'];
  }
}
