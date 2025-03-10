import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createArithmeticGroupIfNecessaryBuilder } from './printers/create-group-if-necessary-builder.js';
import { createArithmeticIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { addition } from './addition.js';
import { bit } from './bit.js';
import { equality } from './equality.js';
import { inequality } from './inequality.js';
import { shift } from './shift.js';

const matchers = [addition, bit, equality, inequality, shift];

const multiplicationPrinter = createBinaryOperationPrinter(
  createArithmeticGroupIfNecessaryBuilder(matchers),
  createArithmeticIndentIfNecessaryBuilder(matchers)
);

export const multiplication = {
  match: (op) => ['*', '/', '%'].includes(op),
  print: multiplicationPrinter
};
