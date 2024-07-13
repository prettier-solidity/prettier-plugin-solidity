import { SlangNode } from './SlangNode.js';

export class TupleExpression extends SlangNode {
  openParen;

  items;

  closeParen;

  constructor({ ast, parse, offset, kind, loc, openParen, items, closeParen }) {
    super(ast, offset);
    if (ast) {
      this.openParen = ast.openParen.text;
      this.items = parse(ast.items, parse, this.nextChildOffset);
      this.closeParen = ast.closeParen.text;
      this.initiateLoc(ast);
    } else {
      this.kind = kind;
      this.loc = loc;
      this.openParen = openParen;
      this.items = items;
      this.closeParen = closeParen;
    }
  }

  print({ path, print }) {
    return [this.openParen, path.call(print, 'items'), this.closeParen];
  }
}
