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

  // In this scenario we are in between jus after a base contract declaration.
  if (precedingNode && precedingNode.type === 'InheritanceSpecifier') {
    if (
      (followingNode && followingNode.type === 'InheritanceSpecifier') ||
      nextCharacter === '{'
    ) {
      addTrailingComment(precedingNode, comment);
      return true;
    }
  }

  // In this scenario we have a comment just after the contract's name
  // TODO: at the moment we prepended it but this should be kept after the name.
  if (
    (followingNode && followingNode.type === 'InheritanceSpecifier') ||
    nextCharacter === '{'
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  // When the contract is empty and contain comments.
  // Most likely disabling a linter rule.
  if (enclosingNode.subNodes.length === 0) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

module.exports = handleContractDefinitionComments;
