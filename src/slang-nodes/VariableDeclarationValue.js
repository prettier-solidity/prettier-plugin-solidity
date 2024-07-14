import { SlangNode } from './SlangNode.js';

export class VariableDeclarationValue extends SlangNode {
  equal;

  expression;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
