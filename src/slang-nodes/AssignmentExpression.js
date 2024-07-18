import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class AssignmentExpression extends SlangNode {
  get kind() {
    return NonterminalKind.AssignmentExpression;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
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
