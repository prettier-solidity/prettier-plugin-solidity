const {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  isBlockComment
} = require('../prettier-comments/language-js/comments');

const handleContractDefinitionComments = require('./handlers/ContractDefinition');
const handleIfStatementComments = require('./handlers/IfStatement');

function handleCommentScenario(
  comment,
  text,
  options,
  ast,
  isLastComment,
  callback
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
    handleIfStatementComments(...handlerArguments) ||
    callback(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

function solidityHandleOwnLineComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  return handleCommentScenario(
    comment,
    text,
    options,
    ast,
    isLastComment,
    handleOwnLineComment
  );
}

function solidityHandleEndOfLineComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  return handleCommentScenario(
    comment,
    text,
    options,
    ast,
    isLastComment,
    handleEndOfLineComment
  );
}

function solidityHandleRemainingComment(
  comment,
  text,
  options,
  ast,
  isLastComment
) {
  return handleCommentScenario(
    comment,
    text,
    options,
    ast,
    isLastComment,
    handleRemainingComment
  );
}

module.exports = {
  handleOwnLineComment: solidityHandleOwnLineComment,
  handleEndOfLineComment: solidityHandleEndOfLineComment,
  handleRemainingComment: solidityHandleRemainingComment,
  isBlockComment
};
