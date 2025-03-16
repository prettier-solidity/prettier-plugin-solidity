import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { addition } from './addition.js';
import { bit } from './bit.js';
import { equality } from './equality.js';
import { inequality } from './inequality.js';
import { shift } from './shift.js';
import { logical } from './logical.js';

export const multiplication = {
  match: (op) => ['*', '/', '%'].includes(op),
  print: binaryOperationPrinter([
    addition,
    shift,
    bit,
    inequality,
    equality,
    logical
  ])
};
