import handlers from './handlers/index.js';

import type { ParserOptions } from 'prettier';
import type { AstNode, Comment } from '../types';

export function slangHandleOwnLineComment(
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

export function slangHandleEndOfLineComment(
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

export function slangHandleRemainingComment(
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
