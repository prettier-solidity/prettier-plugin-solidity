import { SlangNode } from './SlangNode.js';

export class HexNumberExpression extends SlangNode {
  literal;

  unit;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.literal, this.unit ? [' ', path.call(print, 'unit')] : ''];
  }
}
