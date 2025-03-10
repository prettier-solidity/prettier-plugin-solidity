import { defaultBinaryOperationPrinter } from './printers/default-binary-operation-printer.js';

export const shift = {
  match: (op) => ['<<', '>>'].includes(op),
  print: defaultBinaryOperationPrinter
  // grouping and indenting before `bit` should technically be here but they
  // are properly parenthesised before reaching this point.
};
