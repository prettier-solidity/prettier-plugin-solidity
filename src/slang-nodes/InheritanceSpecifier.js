import { SlangNode } from './SlangNode.js';
import { InheritanceTypes } from './InheritanceTypes.js';

export class InheritanceSpecifier extends SlangNode {
  isKeyword;

  types;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      isKeyword: ast.isKeyword?.text,
      types: new InheritanceTypes(
        ast.types,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
