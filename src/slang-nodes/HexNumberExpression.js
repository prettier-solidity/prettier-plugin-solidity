import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

export class HexNumberExpression extends SlangNode {
  get kind() {
    return NonterminalKind.HexNumberExpression;
  }

  literal;

  unit;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      literal: ast.literal.text,
      unit: ast.unit ? new NumberUnit(ast.unit, offsets[0], options) : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
