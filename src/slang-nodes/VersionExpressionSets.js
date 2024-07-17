import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

export class VersionExpressionSets extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new VersionExpressionSet(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [` ${this.separators[index - 1]} `, item]
      );
  }
}
