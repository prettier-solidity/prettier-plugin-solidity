import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

export const BitwiseOrExpression = {
  parse: ({ ast, options, parse }) => ({
    leftOperand: tryHug(parse(ast.leftOperand, options, parse), [
      '+',
      '-',
      '*',
      '/',
      '**',
      '<<',
      '>>',
      '&',
      '^'
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
      '&',
      '^'
    ])
  }),
  print: binaryOperationPrint
};
