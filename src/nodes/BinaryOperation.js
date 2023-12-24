import { printers } from '../binary-operator-printers/index.js';

export const BinaryOperation = {
  print: ({ node, path, print, options }) => {
    const binaryOperationPrinter = printers[node.operator];
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${JSON.stringify(node.operator)}`
      );
    }
    return binaryOperationPrinter({ node, path, print, options });
  }
};
