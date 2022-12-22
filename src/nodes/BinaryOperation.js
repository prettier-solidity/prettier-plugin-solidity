/* eslint-disable consistent-return */
const printers = require('../binary-operator-printers');

const BinaryOperation = {
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

module.exports = BinaryOperation;
