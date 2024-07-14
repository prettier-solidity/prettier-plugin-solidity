import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationValue extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.assignment = parse(ast.assignment, this.nextChildOffset);
    this.expression = parse(ast.expression, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
