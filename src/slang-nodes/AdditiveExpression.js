import {
  binaryOperationPrint,
  createHugFunction
} from '../common/slang-helpers.js';

const tryToHug = createHugFunction(['%']);

export const AdditiveExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: tryToHug(parse(ast.leftOperand, options, parse, offsets)),
    operator: ast.operator.text,
    rightOperand: tryToHug(parse(ast.rightOperand, options, parse, offsets))
  }),
  print: binaryOperationPrint
};
