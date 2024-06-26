import { comparisonOperationPrint } from '../common/slang-helpers.js';

export const EqualityExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  print: comparisonOperationPrint
};
