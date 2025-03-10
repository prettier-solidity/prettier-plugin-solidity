import { defaultBinaryOperationPrinter } from './printers/default-binary-operation-printer.js';

export const bit = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: defaultBinaryOperationPrinter
};
