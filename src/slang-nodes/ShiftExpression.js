import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHugLeftOperand = createHugFunction([
  '+',
  '-',
  '*',
  '/',
  '**',
  '<<',
  '>>'
]);
const tryToHugRightOperand = createHugFunction(['+', '-', '*', '/', '**']);

const postProcess = (properties) => ({
  ...properties,
  leftOperand: tryToHugLeftOperand(properties.leftOperand),
  rightOperand: tryToHugRightOperand(properties.rightOperand)
});

export class ShiftExpression extends SlangNode {
  get kind() {
    return NonterminalKind.ShiftExpression;
  }

  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      leftOperand: new Expression(ast.leftOperand, offsets[0], options),
      operator: ast.operator.text,
      rightOperand: new Expression(ast.rightOperand, offsets[1], options)
    });

    this.initialize(ast, offset, fetch, postProcess);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
