import { SlangNode } from './SlangNode.js';

export class VersionRange extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.leftOperand = parse(ast.leftOperand, parse, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.rightOperand = parse(ast.rightOperand, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: VersionRange'];
  }
}
