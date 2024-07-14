import { SlangNode } from './SlangNode.js';

export class VersionRange extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.leftOperand = parse(ast.leftOperand, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.rightOperand = parse(ast.rightOperand, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: VersionRange'];
  }
}
