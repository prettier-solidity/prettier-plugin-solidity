import { binaryOperationPrint, tryHug } from '../common/slang-helpers.js';

export const MultiplicativeExpression = {
  parse: ({ ast, options, parse }) => {
    let leftOperand = parse(ast.leftOperand, options, parse);
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
      kind: ast.cst.kind,
      leftOperand,
      operator,
      rightOperand: parse(ast.rightOperand, options, parse)
    };
  },
  print: binaryOperationPrint
};
