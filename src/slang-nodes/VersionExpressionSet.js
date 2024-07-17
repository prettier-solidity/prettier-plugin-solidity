import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VersionExpression } from './VersionExpression.js';

const { join } = doc.builders;

export class VersionExpressionSet extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new VersionExpression(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
