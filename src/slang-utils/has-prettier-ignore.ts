import { isBlockComment, isComment } from './is-comment.js';

import type { AstPath } from 'prettier';
import type { AstNode } from '../slang-nodes/types.js';

export function hasPrettierIgnore({ node }: AstPath<AstNode>): boolean {
  if (typeof node === 'string' || node === undefined || isComment(node))
    return false;

  // Prettier sets SourceUnit's comments to undefined after assigning comments
  // to each node.
  return Boolean(
    node.comments?.some(
      (comment) =>
        comment.value
          .slice(2, isBlockComment(comment) ? -2 : undefined)
          .trim() === 'prettier-ignore'
    )
  );
}
