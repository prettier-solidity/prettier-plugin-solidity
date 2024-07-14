import { SlangNode } from './SlangNode.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
