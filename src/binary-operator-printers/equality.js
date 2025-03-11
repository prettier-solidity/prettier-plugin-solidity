import { comparisonOperationPrinter } from './printers/comparison-operation-printer.js';
import { logical } from './logical.js';

export const equality = {
  match: (op) => ['==', '!='].includes(op),
  print: comparisonOperationPrinter([logical])
};
