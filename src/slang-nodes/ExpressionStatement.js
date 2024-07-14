import { SlangNode } from './SlangNode.js';

export class ExpressionStatement extends SlangNode {
  expression;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'expression'), this.semicolon];
  }
}
