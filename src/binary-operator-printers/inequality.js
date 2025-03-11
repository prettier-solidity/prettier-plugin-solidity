import { createGroupedBinaryOperationPrinter } from './printers/create-grouped-binary-operation-printer.js';
import { createComparisonIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { logical } from './logical.js';
import { equality } from './equality.js';

const inequalityPrinter = createGroupedBinaryOperationPrinter(
  createComparisonIndentIfNecessaryBuilder([logical, equality])
);

export const inequality = {
  match: (op) => ['<', '>', '<=', '>='].includes(op),
  print: inequalityPrinter
};
