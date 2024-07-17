import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

export class DecimalNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { literal, unit } = ast;
      this.literal = literal.text;
      if (unit) {
        this.unit = new NumberUnit(
          unit,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
