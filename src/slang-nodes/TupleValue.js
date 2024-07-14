import { SlangNode } from './SlangNode.js';

export class TupleValue extends SlangNode {
  expression;

  constructor(ast, offset, parse) {
    super(ast, offset);
    if (offset) {
      this.initialize(ast, parse);
      this.finalize(ast);
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
