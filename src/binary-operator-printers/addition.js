import { defaultBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';

export const addition = {
  match: (op) => ['+', '-'].includes(op),
  print: defaultBinaryOperationPrinter
  // grouping and indenting before `bit` and `shift` should technically be here
  // but they are properly parenthesised before reaching this point.
};
