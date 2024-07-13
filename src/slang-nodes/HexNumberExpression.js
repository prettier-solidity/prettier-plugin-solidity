import { SlangNode } from './SlangNode.js';

export class HexNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.literal = ast.literal.text;
    this.unit = ast.unit
      ? parse(ast.unit, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
