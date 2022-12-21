/* eslint-disable consistent-return */
const printers = require('../binary-operator-printers');

const BinaryOperation = {
  print: ({ node, path, print, options }) => {
    const binaryOperationPrinter = Object.values(printers).find((printer) =>
      printer.match(node.operator)
    );
    /* c8 ignore start */
    if (binaryOperationPrinter === undefined) {
      throw new Error(
        `Assertion error: no printer found for operator ${node.operator}`
      );
    }
    /* c8 ignore stop */
    return binaryOperationPrinter.print(node, path, print, options);
  }
};

module.exports = BinaryOperation;
