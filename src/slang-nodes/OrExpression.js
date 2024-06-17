import { logicalOperationPrint, tryHug } from '../common/slang-helpers.js';

export const OrExpression = {
  parse: ({ node, offsets, ast, options, parse }) => ({
    ...node,
    leftOperand: tryHug(parse(ast.leftOperand, options, parse, offsets), [
      '&&'
    ]),
    operator: ast.operator.text,
    rightOperand: tryHug(parse(ast.rightOperand, options, parse, offsets), [
      '&&'
    ])
  }),
  print: logicalOperationPrint
};
