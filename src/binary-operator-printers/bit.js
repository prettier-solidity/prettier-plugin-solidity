import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { inequality } from './inequality.js';
import { equality } from './equality.js';
import { logical } from './logical.js';

export const bit = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: binaryOperationPrinter([inequality, equality, logical])
};
