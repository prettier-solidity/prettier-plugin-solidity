import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createGroupIfNecessaryBuilder } from './printers/create-group-if-necessary-builder.js';
import { notIndentParentTypes } from './printers/create-indent-if-necessary-builder.js';
import { shouldGroupOrIndent } from './utils/should-group-or-indent.js';

const { indent } = doc.builders;

const indentIfNecessaryBuilder = (path, options) => (document) => {
  for (let i = 0, { node } = path; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (notIndentParentTypes.includes(parentNode.type)) return document;
    if (
      options.experimentalTernaries &&
      parentNode.type === 'Conditional' &&
      parentNode.condition === node
    )
      return document;
    if (shouldGroupOrIndent(parentNode, [])) return indent(document);
    if (node === parentNode.right) return document;
    node = parentNode;
  }
};

export const logical = {
  match: (op) => ['&&', '||'].includes(op),
  print: createBinaryOperationPrinter(
    createGroupIfNecessaryBuilder([]),
    indentIfNecessaryBuilder
  )
};
