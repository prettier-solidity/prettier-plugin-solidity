import { isBlockComment, isComment } from './is-comment.js';

import type { AstPath } from 'prettier';
import type { PrintableNode } from '../slang-nodes/types.d.ts';

export function hasPrettierIgnore({ node }: AstPath<PrintableNode>): boolean {
  if (isComment(node)) return false;

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
