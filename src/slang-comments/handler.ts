import handlers from './handlers/index.js';

import type { Comment } from '../slang-nodes/types.d.ts';

function handler(
  comment: Comment,
  text: string
  // options: ParserOptions<AstNode>,
  // ast: AstNode,
  // isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

export const handleComments = {
  ownLine: handler,
  endOfLine: handler,
  remaining: handler
};
