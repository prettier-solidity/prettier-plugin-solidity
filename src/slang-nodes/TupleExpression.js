import { SlangNode } from './SlangNode.js';
import { TupleValues } from './TupleValues.js';

export class TupleExpression extends SlangNode {
  openParen;

  items;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();
    if (offset) {
      const fetch = (childrenOffsets) => ({
        openParen: ast.openParen.text,
        items: new TupleValues(
          ast.items,
          childrenOffsets.shift(),
          comments,
          options
        ),
        closeParen: ast.closeParen.text
      });

      this.initialize(ast, offset, fetch, comments);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.openParen = ast.openParen;
      this.items = ast.items;
      this.closeParen = ast.closeParen;
    }
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'items'), this.closeParen];
  }
}
