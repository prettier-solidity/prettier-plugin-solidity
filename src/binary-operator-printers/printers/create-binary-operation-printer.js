import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';
import { equality } from '../equality.js';
import { inequality } from '../inequality.js';
import { rightOperandPrinter } from './right-operand-printer.js';

const { group, indent } = doc.builders;

const comparisonMatchers = [equality, inequality];

export const createGroupIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    const parentNode = path.getParentNode();
    if (shouldGroupOrIndent(parentNode, matchers)) return group(document);
    return document;
  };

export const createIndentIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    let node = path.getNode();
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') return document;
      if (shouldGroupOrIndent(parentNode, matchers)) return indent(document);
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
  createGroupIfNecessaryBuilder(comparisonMatchers),
  createIndentIfNecessaryBuilder(comparisonMatchers)
);
