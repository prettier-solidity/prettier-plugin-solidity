import { SlangNode } from './SlangNode.js';

export class DecimalNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.literal = ast.literal.text;
    if (ast.unit) {
      this.unit = parse(ast.unit, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
