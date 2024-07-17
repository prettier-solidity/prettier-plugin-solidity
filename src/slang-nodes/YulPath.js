import { SlangNode } from './SlangNode.js';
import { YulPathComponent } from './YulPathComponent.js';

export class YulPath extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new YulPathComponent(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
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
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
