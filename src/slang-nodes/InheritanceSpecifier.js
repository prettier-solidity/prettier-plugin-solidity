import { SlangNode } from './SlangNode.js';

export class InheritanceSpecifier extends SlangNode {
  isKeyword;

  types;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
