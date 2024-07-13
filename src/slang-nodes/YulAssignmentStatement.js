import { SlangNode } from './SlangNode.js';

export class YulAssignmentStatement extends SlangNode {
  names;

  assignment;

  expression;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.names = parse(ast.names, parse, this.nextChildOffset);
    this.assignment = parse(ast.assignment, parse, this.nextChildOffset);
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
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
