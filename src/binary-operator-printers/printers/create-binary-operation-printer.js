import { rightOperandPrinter } from './right-operand-printer.js';

export const createBinaryOperationPrinter =
  (groupIfNecessaryBuilder, indentIfNecessaryBuilder) =>
  (node, path, print, options) => {
    const groupIfNecessary = groupIfNecessaryBuilder(path);
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    return groupIfNecessary([
      path.call(print, 'left'),
      indentIfNecessary(rightOperandPrinter(node, path, print, options))
    ]);
  };
