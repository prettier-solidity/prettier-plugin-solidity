import { logicalOperationPrint } from '../common/slang-helpers.js';

export const AndExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  print: logicalOperationPrint
};
