import handlers from './handlers/index.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, Comment } from '../slang-nodes/types.d.ts';

function ownLine(
  comment: Comment,
  text: string,
  options: ParserOptions<AstNode>,
  ast: AstNode,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

function endOfLine(
  comment: Comment,
  text: string,
  options: ParserOptions<AstNode>,
  ast: AstNode,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

function remaining(
  comment: Comment,
  text: string,
  options: ParserOptions<AstNode>,
  ast: AstNode,
  isLastComment: boolean
): boolean {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

export const handleComments = { ownLine, endOfLine, remaining };
