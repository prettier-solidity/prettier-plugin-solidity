import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createGroupIfNecessaryBuilder } from './create-group-if-necessary-builder.js';
import { createIndentIfNecessaryBuilder } from './create-indent-if-necessary-builder.js';

const createComparisonIndentIfNecessaryBuilder = createIndentIfNecessaryBuilder(
  ['ReturnStatement', 'IfStatement', 'ForStatement', 'WhileStatement']
);
export const comparisonOperationPrinter = (shouldGroupAndIndentMatchers) =>
  createBinaryOperationPrinter(
    createGroupIfNecessaryBuilder(shouldGroupAndIndentMatchers),
    createComparisonIndentIfNecessaryBuilder(shouldGroupAndIndentMatchers)
  );
