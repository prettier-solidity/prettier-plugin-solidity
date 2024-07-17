import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';

export class OverridePaths extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new IdentifierPath(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
            options
          )
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePaths'];
  }
}
