import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { logical } from './logical.js';

export const equality = {
  match: (op) => ['==', '!='].includes(op),
  print: binaryOperationPrinter([logical])
};
