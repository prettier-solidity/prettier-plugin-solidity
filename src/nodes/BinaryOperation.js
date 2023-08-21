import * as printers from '../binary-operator-printers/index.js';

export const BinaryOperation = {
  print: ({ node, path, print, options }) => {
    const binaryOperationPrinter = Object.values(printers).find((printer) =>
      printer.match(node.operator)
    );
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${JSON.stringify(
          node.operator
        )}`
      );
    }
    return binaryOperationPrinter.print(node, path, print, options);
  }
};
