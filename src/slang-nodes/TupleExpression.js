import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TupleValues } from './TupleValues.js';

export class TupleExpression extends SlangNode {
  get kind() {
    return NonterminalKind.TupleExpression;
  }

  openParen;

  items;

  closeParen;

  constructor(ast, offset, options) {
    super();

    if (offset) {
      const fetch = (childrenOffsets) => ({
        openParen: ast.openParen.text,
        items: new TupleValues(ast.items, childrenOffsets.shift(), options),
        closeParen: ast.closeParen.text
      });

      this.initialize(ast, offset, fetch);
    } else {
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
