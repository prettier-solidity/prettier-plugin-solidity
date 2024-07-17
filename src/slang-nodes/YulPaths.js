import { SlangNode } from './SlangNode.js';
import { YulPath } from './YulPath.js';

export class YulPaths extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new YulPath(item, childrenOffsets.shift(), comments, parse, options)
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
