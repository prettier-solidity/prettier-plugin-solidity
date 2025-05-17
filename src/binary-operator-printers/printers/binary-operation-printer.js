import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createGroupIfNecessaryBuilder } from './create-group-if-necessary-builder.js';
import { createIndentIfNecessaryBuilder } from './create-indent-if-necessary-builder.js';

export const binaryOperationPrinter = (shouldGroupAndIndentMatchers) =>
  createBinaryOperationPrinter(
    createGroupIfNecessaryBuilder(shouldGroupAndIndentMatchers),
    createIndentIfNecessaryBuilder(shouldGroupAndIndentMatchers)
  );
