import {
  createComparisonOperationPrinter,
  createIndentIfNecessaryBuilder
} from './printers/create-comparison-operation-printer.js';
import { logical } from './logical.js';

const equalityPrinter = createComparisonOperationPrinter(
  createIndentIfNecessaryBuilder([logical])
);

export const equality = {
  match: (op) => ['==', '!='].includes(op),
  print: equalityPrinter
};
