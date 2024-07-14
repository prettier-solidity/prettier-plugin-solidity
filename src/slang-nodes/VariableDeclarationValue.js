import { SlangNode } from './SlangNode.js';

export class VariableDeclarationValue extends SlangNode {
  equal;

  expression;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
