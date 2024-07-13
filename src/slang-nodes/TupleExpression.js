import { SlangNode } from './SlangNode.js';

export class TupleExpression extends SlangNode {
  openParen;

  items;

  closeParen;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    if (offset) {
      this.openParen = ast.openParen.text;
      this.items = parse(ast.items, parse, this.nextChildOffset);
      this.closeParen = ast.closeParen.text;
      this.initiateLoc(ast);
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
