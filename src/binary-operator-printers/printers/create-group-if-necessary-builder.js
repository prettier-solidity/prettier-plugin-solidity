import { doc } from 'prettier';
import { shouldGroupOrIndent } from '../utils/should-group-or-indent.js';

const { group } = doc.builders;

export const createGroupIfNecessaryBuilder =
  (shouldIndentMatchers) => (path) => (document) => {
    const { parent } = path;
    if (shouldGroupOrIndent(parent, shouldIndentMatchers))
      return group(document);
    return document;
  };
