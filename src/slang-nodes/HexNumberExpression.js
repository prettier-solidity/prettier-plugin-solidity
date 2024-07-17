import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

export class HexNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      literal: ast.literal.text,
      unit: ast.unit
        ? new NumberUnit(ast.unit, childrenOffsets.shift(), comments, options)
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
