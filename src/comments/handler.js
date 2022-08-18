const {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  isBlockComment
} = require('../prettier-comments/language-js/comments');

const handlers = require('./handlers');

function solidityHandleOwnLineComment(
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
    options
  };

  if (
    handlers.ContractDefinition.handleOwnLineComment(handlerArguments) ||
    handlers.ModifierInvocation.handleOwnLineComment(handlerArguments) ||
    handleOwnLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

function solidityHandleEndOfLineComment(
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
    options
  };

  if (
    handlers.ContractDefinition.handleEndOfLineComment(handlerArguments) ||
    handlers.ModifierInvocation.handleEndOfLineComment(handlerArguments) ||
    handleEndOfLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

function solidityHandleRemainingComment(
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
    options
  };

  if (
    handlers.ContractDefinition.handleRemainingComment(handlerArguments) ||
    handlers.ModifierInvocation.handleRemainingComment(handlerArguments) ||
    handleRemainingComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

module.exports = {
  handleOwnLineComment: solidityHandleOwnLineComment,
  handleEndOfLineComment: solidityHandleEndOfLineComment,
  handleRemainingComment: solidityHandleRemainingComment,
  isBlockComment
};
