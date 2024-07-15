import { SlangNode } from './SlangNode.js';

export class OverrideSpecifier extends SlangNode {
  overrideKeyword;

  overridden;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
