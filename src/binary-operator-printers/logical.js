import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './printers/create-binary-operation-printer.js';
import { createGroupIfNecessaryBuilder } from './printers/create-group-if-necessary-builder.js';

const { indent } = doc.builders;

const indentIfNecessaryBuilder = (path, options) => (document) => {
  let node = path.getNode();
  for (let i = 0; ; i += 1) {
    const parentNode = path.getParentNode(i);
    if (parentNode.type === 'ReturnStatement') return document;
    if (parentNode.type === 'IfStatement') return document;
    if (parentNode.type === 'WhileStatement') return document;
    if (
      options.experimentalTernaries &&
      parentNode.type === 'Conditional' &&
      parentNode.condition === node
    )
      return document;
    if (parentNode.type !== 'BinaryOperation') return indent(document);
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
