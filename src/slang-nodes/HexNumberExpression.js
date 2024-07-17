import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

export class HexNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { literal, unit } = ast;
      this.literal = literal.text;
      if (unit) {
        this.unit = new NumberUnit(
          unit,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
