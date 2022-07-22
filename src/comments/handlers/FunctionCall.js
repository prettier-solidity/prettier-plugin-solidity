const {
  util: {
    addLeadingComment,
    addTrailingComment,
    addDanglingComment,
    getNextNonSpaceNonCommentCharacterIndex
  }
} = require('prettier');

function handleRemainingComment({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
}) {
  if (!enclosingNode || enclosingNode.type !== 'FunctionCall') {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the parenthesis:
  //   functionCall(/* comment */);
  // The only workaround I found is to look at the next character to see if
  // it is a `)`.
  const nextCharacter = text.charAt(
    getNextNonSpaceNonCommentCharacterIndex(text, comment, options.locEnd)
  );

  console.log(comment);
  // The comment is behind the closing of the FunctionCall `)`
  if (nextCharacter === '(') {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  // The comment is behind the closing of the FunctionCall `)`
  if (nextCharacter === ')') {
    console.log('here )');
  }

  return false;
}

module.exports = {
  print: true,
  handleOwnLineComment: () => false,
  handleEndOfLineComment: () => false,
  handleRemainingComment
};
