import { arithmetic } from './arithmetic.js';
import { assignment } from './assignment.js';
import { bit } from './bit.js';
import { comparison } from './comparison.js';
import { exponentiation } from './exponentiation.js';
import { logical } from './logical.js';
import { shift } from './shift.js';
import type { BinOp } from '@solidity-parser/parser/src/ast-types';
import type { BinaryOperationPrinter } from './types';

export const printers = [
  arithmetic,
  assignment,
  bit,
  comparison,
  exponentiation,
  logical,
  shift
].reduce(
  (
    acc: { [key in BinOp]?: BinaryOperationPrinter['print'] },
    binaryOperationPrinter
  ) => {
    binaryOperationPrinter.operators.forEach((operator) => {
      acc[operator] = binaryOperationPrinter.print;
    });
    return acc;
  },
  {}
);
