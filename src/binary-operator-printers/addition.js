import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { bit } from './bit.js';
import { shift } from './shift.js';
import { inequality } from './inequality.js';
import { equality } from './equality.js';
import { logical } from './logical.js';

export const addition = {
  match: (op) => ['+', '-'].includes(op),
  print: binaryOperationPrinter([shift, bit, inequality, equality, logical])
};
