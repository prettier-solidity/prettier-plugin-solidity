import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHug = createHugFunction(['+', '-', '*', '/', '**', '<<', '>>']);

const postProcess = (properties) => ({
  ...properties,
  leftOperand: tryToHug(properties.leftOperand),
  rightOperand: tryToHug(properties.rightOperand)
});

export class BitwiseAndExpression extends SlangNode {
  get kind() {
    return NonterminalKind.BitwiseAndExpression;
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
