import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';

export class OverridePaths extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new IdentifierPath(item, childrenOffsets.shift(), comments, options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: OverridePaths'];
  }
}
