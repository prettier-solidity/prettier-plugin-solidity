const {
  util: { addLeadingComment, addTrailingComment, addDanglingComment }
} = require('prettier');
const privateUtil = require('../../prettier-comments/common/util');

function handleContractDefinitionComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  if (!enclosingNode || enclosingNode.type !== 'ContractDefinition') {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   contract a is abc /* comment */ {}
  // The only workaround I found is to look at the next character to see if
  // it is a {}.
  const nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    options.locEnd
  );

  if (precedingNode && precedingNode.type === 'InheritanceSpecifier') {
    if (
      (followingNode && followingNode.type === 'InheritanceSpecifier') ||
      nextCharacter === '{'
    ) {
      addTrailingComment(precedingNode, comment);
      return true;
    }
  }

  if (
    (followingNode && followingNode.type === 'InheritanceSpecifier') ||
    nextCharacter === '{'
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  if (enclosingNode.subNodes.length === 0) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

module.exports = handleContractDefinitionComments;
