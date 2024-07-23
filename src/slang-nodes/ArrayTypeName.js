import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

export class ArrayTypeName extends SlangNode {
  get kind() {
    return NonterminalKind.ArrayTypeName;
  }

  operand;

  openBracket;

  index;

  closeBracket;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      operand: new TypeName(ast.operand, offsets[0], options),
      openBracket: ast.openBracket.text,
      index: ast.index
        ? new Expression(ast.index, offsets[1], options)
        : undefined,
      closeBracket: ast.closeBracket.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBracket,
      this.index ? path.call(print, 'index') : '',
      this.closeBracket
    ];
  }
}
