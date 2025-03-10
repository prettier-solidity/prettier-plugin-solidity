import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createComparisonIndentIfNecessaryBuilder } from './printers/create-indent-if-necessary-builder.js';
import { logical } from './logical.js';
import { equality } from './equality.js';

const { group } = doc.builders;

const inequalityPrinter = createBinaryOperationPrinter(
  () => (document) => group(document), // always group
  createComparisonIndentIfNecessaryBuilder([logical, equality])
);

export const inequality = {
  match: (op) => ['<', '>', '<=', '>='].includes(op),
  print: inequalityPrinter
};
