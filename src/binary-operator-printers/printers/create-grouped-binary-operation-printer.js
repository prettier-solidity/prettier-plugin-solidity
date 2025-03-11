import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

const { group } = doc.builders;

export const createGroupedBinaryOperationPrinter = (indentIfNecessaryBuilder) =>
  createBinaryOperationPrinter(
    () => (document) => group(document), // always group
    indentIfNecessaryBuilder
  );
