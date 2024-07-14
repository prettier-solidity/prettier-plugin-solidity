import { SlangNode } from './SlangNode.js';

export class HexNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
