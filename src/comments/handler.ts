import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments.js';
import handlers from './handlers/index.js';
import type {
  ASTNode,
  BlockComment,
  Comment,
  Location,
  Position,
  SourceUnit
} from '@solidity-parser/parser/src/ast-types';
import type { ParserOptions } from 'prettier';

export function solidityHandleOwnLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: SourceUnit,
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

  return (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleOwnLineComment.some((handler) => handler(handlerArguments))
  );
}

export function solidityHandleEndOfLineComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: SourceUnit,
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
  return (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleEndOfLineComment.some((handler) => handler(handlerArguments))
  );
}

export function solidityHandleRemainingComment(
  comment: Comment,
  text: string,
  options: ParserOptions,
  ast: SourceUnit,
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

  return (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleRemainingComment.some((handler) => handler(handlerArguments))
  );
}

export function isBlockComment(
  comment: ASTNode | Comment
): comment is BlockComment {
  return comment.type === 'BlockComment';
}

function isNodeOrComment(
  node: ASTNode | Comment | Location | Position
): node is ASTNode | Comment {
  return (node as ASTNode | Comment).type !== undefined;
}

export function canAttachComment(
  node: ASTNode | Comment | Location | Position
): boolean {
  return (
    isNodeOrComment(node) &&
    !isBlockComment(node) &&
    node.type !== 'LineComment'
  );
}
