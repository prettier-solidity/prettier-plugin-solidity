import { SlangNode } from './SlangNode.js';

export class TupleValue extends SlangNode {
  expression;

  constructor({ ast, parse, offset, kind, loc, expression }) {
    super(ast, offset);
    if (ast) {
      this.expression = ast.expression
        ? parse(ast.expression, parse, this.nextChildOffset)
        : undefined;
      this.initiateLoc(ast);
    } else {
      this.kind = kind;
      this.loc = loc;
      this.expression = expression;
    }
  }

  print({ path, print }) {
    return this.expression ? path.call(print, 'expression') : '';
  }
}
