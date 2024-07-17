import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

export class OverrideSpecifier extends SlangNode {
  overrideKeyword;

  overridden;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { overrideKeyword, overridden } = ast;
      this.overrideKeyword = overrideKeyword.text;
      if (overridden) {
        this.overridden = new OverridePathsDeclaration(
          overridden,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
