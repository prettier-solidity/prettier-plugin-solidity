import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';

const { group } = doc.builders;

export const createGroupIfNecessaryBuilder =
  (matchers) => (path) => (document) => {
    const parentNode = path.getParentNode();
    if (shouldGroupOrIndent(parentNode, matchers)) return group(document);
    return document;
  };
