import { doc } from 'prettier';
import { isBinaryOperation } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.leftOperand = parse(ast.leftOperand, parse, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.rightOperand = parse(ast.rightOperand, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'leftOperand'),
      ` ${this.operator}`,
      isBinaryOperation(this.rightOperand.variant)
        ? group(indent([line, path.call(print, 'rightOperand')]))
        : [' ', path.call(print, 'rightOperand')]
    ];
  }
}
