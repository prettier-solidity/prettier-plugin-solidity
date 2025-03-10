import { doc } from 'prettier';
import { comparison } from '../comparison.js';
import { rightOperandPrinter } from './right-operand-printer.js';

const { group, indent } = doc.builders;

const shouldGroupOrIndent = (node, matchers) =>
  matchers.some((matcher) => matcher.match(node.operator));

export const createGroupIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    const parentNode = path.getParentNode();
    if (
      parentNode.type === 'BinaryOperation' &&
      !comparison.match(parentNode.operator)
    ) {
      return shouldGroupOrIndent(parentNode, matchers)
        ? group(document)
        : document;
    }
    return group(document);
  };

export const createIndentIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    let node = path.getNode();
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') return document;
      if (
        parentNode.type !== 'BinaryOperation' ||
        comparison.match(parentNode.operator) ||
        shouldGroupOrIndent(parentNode, matchers)
      ) {
        return indent(document);
      }
      if (node === parentNode.right) return document;
      node = parentNode;
    }
  };

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

export const defaultBinaryOperationPrinter = createBinaryOperationPrinter(
  createGroupIfNecessaryBuilder([]),
  createIndentIfNecessaryBuilder([])
);
