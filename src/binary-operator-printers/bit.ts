import { arithmetic } from './arithmetic.js';
import type { BinaryOperationPrinter } from './types';

export const bit: BinaryOperationPrinter = {
  operators: ['&', '|', '^'],
  print: arithmetic.print
};
