import { arithmetic } from './arithmetic.js';
import { assignment } from './assignment.js';
import { bit } from './bit.js';
import { comparison } from './comparison.js';
import { exponentiation } from './exponentiation.js';
import { logical } from './logical.js';
import { shift } from './shift.js';

export const printers = [
  arithmetic,
  assignment,
  bit,
  comparison,
  exponentiation,
  logical,
  shift
].reduce((acc, binaryOperationPrinter) => {
  binaryOperationPrinter.operators.forEach((operator) => {
    acc[operator] = binaryOperationPrinter.print;
  });
  return acc;
}, {});
