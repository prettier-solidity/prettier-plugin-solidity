import { SlangNode } from './SlangNode.js';

export class TupleValue extends SlangNode {
  expression;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    if (offset) {
      this.expression = ast.expression
        ? parse(ast.expression, this.nextChildOffset)
        : undefined;
      this.initiateLoc(ast);
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
