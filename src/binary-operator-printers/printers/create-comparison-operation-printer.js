import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';
import { rightOperandPrinter } from './right-operand-printer.js';

const { group, indent } = doc.builders;

export const createIndentIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    let node = path.getNode();
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (parentNode.type === 'ReturnStatement') return document;
      if (parentNode.type === 'IfStatement') return document;
      if (parentNode.type === 'ForStatement') return document;
      if (parentNode.type === 'WhileStatement') return document;
      if (shouldGroupOrIndent(parentNode, matchers)) return indent(document);
      if (node === parentNode.right) return document;
      node = parentNode;
    }
  };

export const createComparisonOperationPrinter =
  (indentIfNecessaryBuilder) => (node, path, print, options) => {
    const indentIfNecessary = indentIfNecessaryBuilder(path);

    return group([
      path.call(print, 'left'),
      indentIfNecessary(rightOperandPrinter(node, path, print, options))
    ]);
  };
