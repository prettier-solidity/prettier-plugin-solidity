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

    const fetch = (childrenOffsets) => ({
      openBracket: ast.openBracket.text,
      items: new ArrayValues(
        ast.items,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBracket: ast.closeBracket.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
