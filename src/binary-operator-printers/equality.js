import { createGroupedBinaryOperationPrinter } from './printers/create-grouped-binary-operation-printer.js';
import { createComparisonIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { logical } from './logical.js';

const equalityPrinter = createGroupedBinaryOperationPrinter(
  createComparisonIndentIfNecessaryBuilder([logical])
);

export const equality = {
  match: (op) => ['==', '!='].includes(op),
  print: equalityPrinter
};
