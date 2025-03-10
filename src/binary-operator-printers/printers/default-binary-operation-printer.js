import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createArithmeticGroupIfNecessaryBuilder } from './create-group-if-necessary-builder.js';
import { createArithmeticIndentIfNecessaryBuilder } from './create-indent-if-necessary-builder.js';
import { equality } from '../equality.js';
import { inequality } from '../inequality.js';

const comparisonMatchers = [equality, inequality];

export const defaultBinaryOperationPrinter = createBinaryOperationPrinter(
  createArithmeticGroupIfNecessaryBuilder(comparisonMatchers),
  createArithmeticIndentIfNecessaryBuilder(comparisonMatchers)
);
