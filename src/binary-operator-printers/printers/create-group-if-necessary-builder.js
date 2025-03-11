import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';

const { group } = doc.builders;

export const createGroupIfNecessaryBuilder =
  (shouldIndentMatchers) => (path) => (document) => {
    const parentNode = path.getParentNode();
    if (shouldGroupOrIndent(parentNode, shouldIndentMatchers))
      return group(document);
    return document;
  };
