import { SlangNode } from './SlangNode.js';

export class TupleValue extends SlangNode {
  expression;

  constructor(ast, offset, comments, parse) {
    super();
    if (offset) {
      this.initialize(ast, offset, comments, parse);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.expression = ast.expression;
    }
  }

  print(path, print) {
    return this.expression ? path.call(print, 'expression') : '';
  }
}
