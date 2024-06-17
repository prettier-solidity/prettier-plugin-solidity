import { comparisonOperationPrint } from '../common/slang-helpers.js';

export const ComparisonExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  print: comparisonOperationPrint
};
