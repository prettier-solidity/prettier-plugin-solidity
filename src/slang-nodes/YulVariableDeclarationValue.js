import { SlangNode } from './SlangNode.js';

export class YulVariableDeclarationValue extends SlangNode {
  assignment;

  expression;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.assignment = parse(ast.assignment, parse, this.nextChildOffset);
    this.expression = parse(ast.expression, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'assignment'),
      ' ',
      path.call(print, 'expression')
    ];
  }
}
