import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

const leftOperandHuggableOperators = new Set([
  '+',
  '-',
  '*',
  '/',
  '**',
  '<<',
  '>>'
]);
const rightOperandHuggableOperators = new Set(['+', '-', '*', '/', '**']);

export const ShiftExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: tryHug(
      parse(ast.leftOperand, options, parse, offsets),
      leftOperandHuggableOperators
    ),
    operator: ast.operator.text,
    rightOperand: tryHug(
      parse(ast.rightOperand, options, parse, offsets),
      rightOperandHuggableOperators
    )
  }),
  print: binaryOperationPrint
};
