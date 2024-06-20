import { logicalOperationPrint, tryHug } from '../common/slang-helpers.js';

const huggableOperators = new Set(['&&']);

export const OrExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: tryHug(
      parse(ast.leftOperand, options, parse, offsets),
      huggableOperators
    ),
    operator: ast.operator.text,
    rightOperand: tryHug(
      parse(ast.rightOperand, options, parse, offsets),
      huggableOperators
    )
  }),
  print: logicalOperationPrint
};
