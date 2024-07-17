import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

export class VersionExpressionSets extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new VersionExpressionSet(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [` ${this.separators[index - 1]} `, item]
      );
  }
}
