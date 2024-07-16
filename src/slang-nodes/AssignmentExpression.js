import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
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
