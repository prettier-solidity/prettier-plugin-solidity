import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationValue extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
