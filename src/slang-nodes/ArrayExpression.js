import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ArrayValues } from './ArrayValues.js';

const { group } = doc.builders;

export class ArrayExpression extends SlangNode {
  openBracket;

  items;

  closeBracket;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBracket, items, closeBracket } = ast;
      this.openBracket = openBracket.text;
      this.items = new ArrayValues(
        items,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeBracket = closeBracket.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
