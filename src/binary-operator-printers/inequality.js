import {
  createComparisonOperationPrinter,
  createIndentIfNecessaryBuilder
} from './printers/create-comparison-operation-printer.js';
import { logical } from './logical.js';
import { equality } from './equality.js';

const inequalityPrinter = createComparisonOperationPrinter(
  createIndentIfNecessaryBuilder([logical, equality])
);

export const inequality = {
  match: (op) => ['<', '>', '<=', '>='].includes(op),
  print: inequalityPrinter
};
