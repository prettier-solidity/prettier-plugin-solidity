import { SlangNode } from './SlangNode.js';

export class TupleExpression extends SlangNode {
  openParen;

  items;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super();
    if (offset) {
      this.initialize(ast, offset, comments, parse);
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
