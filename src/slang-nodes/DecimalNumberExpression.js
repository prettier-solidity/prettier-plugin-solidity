import { SlangNode } from './SlangNode.js';

export class DecimalNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.literal = ast.literal.text;
    this.unit = ast.unit ? parse(ast.unit, this.nextChildOffset) : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
