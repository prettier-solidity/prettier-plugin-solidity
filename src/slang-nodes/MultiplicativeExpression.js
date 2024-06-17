import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

export const MultiplicativeExpression = {
  parse: ({ node, offsets, ast, options, parse }) => {
    let leftOperand = parse(ast.leftOperand, options, parse, offsets);
    const operator = ast.operator.text;

    switch (operator) {
      case '*':
        leftOperand = tryHug(leftOperand, ['/', '%']);
        break;
      case '/':
        leftOperand = tryHug(leftOperand, ['*', '%']);
        break;
      case '%':
        leftOperand = tryHug(leftOperand, ['*', '/', '%']);
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
