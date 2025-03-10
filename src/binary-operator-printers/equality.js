import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createComparisonIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { logical } from './logical.js';

const { group } = doc.builders;

const equalityPrinter = createBinaryOperationPrinter(
  () => (document) => group(document), // always group
  createComparisonIndentIfNecessaryBuilder([logical])
);

export const equality = {
  match: (op) => ['==', '!='].includes(op),
  print: equalityPrinter
};
