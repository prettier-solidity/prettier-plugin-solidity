import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationValue extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
