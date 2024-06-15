import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

export const BitwiseXorExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: tryHug(parse(ast.leftOperand, options, parse), [
      '+',
      '-',
      '*',
      '/',
      '**',
      '<<',
      '>>',
      '&'
    ]),
    operator: ast.operator.text,
    rightOperand: tryHug(parse(ast.rightOperand, options, parse), [
      '+',
      '-',
      '*',
      '/',
      '**',
      '<<',
      '>>',
      '&'
    ])
  }),
  print: binaryOperationPrint
};
