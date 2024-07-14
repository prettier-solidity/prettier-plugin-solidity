import { SlangNode } from './SlangNode.js';

export class YulVariableAssignmentStatement extends SlangNode {
  names;

  assignment;

  expression;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.names = parse(ast.names, this.nextChildOffset);
    this.assignment = parse(ast.assignment, this.nextChildOffset);
    this.expression = parse(ast.expression, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'names'),
      ' ',
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
