import {
  binaryOperationPrint,
  createHugFunction
} from '../common/slang-helpers.js';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export const MultiplicativeExpression = {
  parse: ({ offsets, ast, options, parse }) => {
    let leftOperand = parse(ast.leftOperand, options, parse, offsets);
    const operator = ast.operator.text;

    switch (operator) {
      case '*':
        leftOperand = multiplicationTryToHug(leftOperand);
        break;
      case '/':
        leftOperand = divisionTryToHug(leftOperand);
        break;
      case '%':
        leftOperand = moduloTryToHug(leftOperand);
        break;
      default:
        break;
    }

    return {
      leftOperand,
      operator,
      rightOperand: parse(ast.rightOperand, options, parse, offsets)
    };
  },
  print: binaryOperationPrint
};
