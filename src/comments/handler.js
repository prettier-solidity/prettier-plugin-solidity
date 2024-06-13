import {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment
} from '../prettier-comments/language-js/comments.ts';
import handlers from './handlers/index.ts';

export function solidityHandleOwnLineComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleOwnLineComment(comment, text, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleEndOfLineComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleEndOfLineComment(comment, text, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function solidityHandleRemainingComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = {
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment
  };

  if (
    handlers.some((handler) => handler(handlerArguments)) ||
    handleRemainingComment(comment, text, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

export function isBlockComment(comment) {
  return comment.type === 'BlockComment';
}

function isNodeOrComment(node) {
  return node.type !== undefined;
}

export function canAttachComment(node) {
  return (
    isNodeOrComment(node) &&
    !isBlockComment(node) &&
    node.type !== 'LineComment'
  );
}
