import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';

const { indent } = doc.builders;

export const createIndentIfNecessaryBuilder =
  (notIndentParentTypes) => (shouldIndentMatchers) => (path) => (document) => {
    let node = path.getNode();
    for (let i = 0; ; i += 1) {
      const parentNode = path.getParentNode(i);
      if (notIndentParentTypes.includes(parentNode.type)) return document;
      if (shouldGroupOrIndent(parentNode, shouldIndentMatchers))
        return indent(document);
      if (node === parentNode.right) return document;
      node = parentNode;
    }
  };
