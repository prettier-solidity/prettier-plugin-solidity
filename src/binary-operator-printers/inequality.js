import { comparisonOperationPrinter } from './printers/comparison-operation-printer.js';
import { logical } from './logical.js';
import { equality } from './equality.js';

export const inequality = {
  match: (op) => ['<', '>', '<=', '>='].includes(op),
  print: comparisonOperationPrinter([logical, equality])
};
