import { comparisonOperationPrint } from '../common/slang-helpers.js';

export const ComparisonExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  print: comparisonOperationPrint
};
