import { logicalOperationPrint } from '../common/slang-helpers.js';

export const AndExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  print: logicalOperationPrint
};
