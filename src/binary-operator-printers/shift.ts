import { arithmetic } from './arithmetic.js';
import type { BinaryOperationPrinter } from './types';

export const shift: BinaryOperationPrinter = {
  operators: ['<<', '>>'],
  print: arithmetic.print
};
