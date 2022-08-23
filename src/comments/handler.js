const {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  isBlockComment
} = require('../prettier-comments/language-js/comments');

const handleContractDefinitionComments = require('./handlers/ContractDefinition');
const handleMemberAccessComments = require('./handlers/MemberAccess');

function solidityHandleOwnLineComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleMemberAccessComments(...handlerArguments) ||
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
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleMemberAccessComments(...handlerArguments) ||
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
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleMemberAccessComments(...handlerArguments) ||
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
