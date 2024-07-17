import { SlangNode } from './SlangNode.js';
import { InheritanceTypes } from './InheritanceTypes.js';

export class InheritanceSpecifier extends SlangNode {
  isKeyword;

  types;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { isKeyword, types } = ast;
      this.isKeyword = isKeyword?.text;
      this.types = new InheritanceTypes(
        types,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
