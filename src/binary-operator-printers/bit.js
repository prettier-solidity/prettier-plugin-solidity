import { defaultBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';

export const bit = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: defaultBinaryOperationPrinter
};
