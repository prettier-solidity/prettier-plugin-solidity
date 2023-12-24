import { arithmetic } from './arithmetic.js';
import { assignment } from './assignment.ts';
import { bit } from './bit.ts';
import { comparison } from './comparison.js';
import { exponentiation } from './exponentiation.ts';
import { logical } from './logical.js';
import { shift } from './shift.ts';

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
