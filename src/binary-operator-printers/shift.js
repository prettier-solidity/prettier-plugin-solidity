import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { bit } from './bit.js';
import { inequality } from './inequality.js';
import { equality } from './equality.js';
import { logical } from './logical.js';

export const shift = {
  match: (op) => ['<<', '>>'].includes(op),
  print: binaryOperationPrinter([bit, inequality, equality, logical])
};
