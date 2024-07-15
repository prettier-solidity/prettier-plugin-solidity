import { SlangNode } from './SlangNode.js';

export class InheritanceSpecifier extends SlangNode {
  isKeyword;

  types;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
