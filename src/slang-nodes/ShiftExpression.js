import {
  binaryOperationPrint,
  createHugFunction
} from '../common/slang-helpers.js';

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

export const ShiftExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: tryToHugLeftOperand(
      parse(ast.leftOperand, options, parse, offsets)
    ),
    operator: ast.operator.text,
    rightOperand: tryToHugRightOperand(
      parse(ast.rightOperand, options, parse, offsets)
    )
  }),
  print: binaryOperationPrint
};
