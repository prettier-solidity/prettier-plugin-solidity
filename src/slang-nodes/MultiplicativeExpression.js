import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

const multiplicationHuggableOperators = new Set(['/', '%']);
const divisionHuggableOperators = new Set(['*', '%']);
const moduloHuggableOperators = new Set(['*', '/', '%']);

export const MultiplicativeExpression = {
  parse: ({ node, offsets, ast, options, parse }) => {
    let leftOperand = parse(ast.leftOperand, options, parse, offsets);
    const operator = ast.operator.text;

    switch (operator) {
      case '*':
        leftOperand = tryHug(leftOperand, multiplicationHuggableOperators);
        break;
      case '/':
        leftOperand = tryHug(leftOperand, divisionHuggableOperators);
        break;
      case '%':
        leftOperand = tryHug(leftOperand, moduloHuggableOperators);
        break;
      default:
        break;
    }

    return {
      ...node,
      leftOperand,
      operator,
      rightOperand: parse(ast.rightOperand, options, parse, offsets)
    };
  },
  print: binaryOperationPrint
};
