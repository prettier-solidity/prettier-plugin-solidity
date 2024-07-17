import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
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
