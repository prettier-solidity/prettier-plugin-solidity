import handlers from './handlers/index.js';

export function slangHandleOwnLineComment(
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
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

export function slangHandleEndOfLineComment(
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
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
}

export function slangHandleRemainingComment(
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
    comment,
    ast,
    isLastComment
  };

  return handlers.some((handler) => handler(handlerArguments));
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
