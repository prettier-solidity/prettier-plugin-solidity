import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

export class DecimalNumberExpression extends SlangNode {
  get kind() {
    return NonterminalKind.DecimalNumberExpression;
  }

  literal;

  unit;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      literal: ast.literal.text,
      unit: ast.unit
        ? new NumberUnit(ast.unit, childrenOffsets.shift(), options)
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
