import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

export class OverrideSpecifier extends SlangNode {
  overrideKeyword;

  overridden;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      overrideKeyword: ast.overrideKeyword.text,
      overridden: ast.overridden
        ? new OverridePathsDeclaration(
            ast.overridden,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
