/* eslint-disable consistent-return */
const printers = require('../binary-operator-printers');

const BinaryOperation = {
  print: ({ node, path, print, options }) =>
    Object.values(printers)
      .find((printer) => printer.match(node.operator))
      .print(node, path, print, options)
};

module.exports = BinaryOperation;
