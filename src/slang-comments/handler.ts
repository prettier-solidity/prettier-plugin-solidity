import handlers from './handlers/index.js';

import type { AstPath, ParserOptions } from 'prettier';
import type { Comment } from '../types.js';

export function slangHandleOwnLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
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

export function slangHandleEndOfLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
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

export function slangHandleRemainingComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: AstPath,
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
