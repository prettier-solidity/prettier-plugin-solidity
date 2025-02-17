import {
  createBinaryOperationPrinter,
  createGroupIfNecessaryBuilder,
  createIndentIfNecessaryBuilder
} from './printers/create-binary-operation-printer.js';
import { addition } from './addition.js';
import { bit } from './bit.js';
import { shift } from './shift.js';

const matchers = [addition, bit, shift];

const multiplicationPrinter = createBinaryOperationPrinter(
  createGroupIfNecessaryBuilder(matchers),
  createIndentIfNecessaryBuilder(matchers)
);

export const multiplication = {
  match: (op) => ['*', '/', '%'].includes(op),
  print: multiplicationPrinter
};
