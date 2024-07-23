import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ArrayValues } from './ArrayValues.js';

const { group } = doc.builders;

export class ArrayExpression extends SlangNode {
  get kind() {
    return NonterminalKind.ArrayExpression;
  }

  openBracket;

  items;

  closeBracket;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openBracket: ast.openBracket.text,
      items: new ArrayValues(ast.items, offsets[0], options),
      closeBracket: ast.closeBracket.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
