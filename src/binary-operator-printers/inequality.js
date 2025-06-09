import { binaryOperationPrinter } from './printers/binary-operation-printer.js';
import { logical } from './logical.js';
import { equality } from './equality.js';

export const inequality = {
  match: (op) => ['<', '>', '<=', '>='].includes(op),
  print: binaryOperationPrinter([logical, equality])
};
