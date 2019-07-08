const {
  util: { addLeadingComment, addTrailingComment, addDanglingComment }
} = require('prettier');
const privateUtil = require('../../prettier-comments/common/util');
const debug = require('./debug.js');

function handleIfStatementComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment,
  options
) {
  if (
    !enclosingNode ||
    enclosingNode.type !== 'IfStatement' ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    options.locEnd
  );
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === 'IfStatement') {
    if (followingNode.trueBody.type === 'Block') {
      // debug(comment);
      addDanglingComment(followingNode.trueBody, comment);
    } else {
      addLeadingComment(followingNode.trueBody, comment);
    }
    return true;
  }

  // Comments before `else`:
  // - treat as trailing comments of the trueBody, if it's not a Block
  // - treat as a dangling comment otherwise
  if (
    precedingNode === enclosingNode.trueBody &&
    followingNode === enclosingNode.falseBody
  ) {
    if (precedingNode.type !== 'Block') {
      addTrailingComment(precedingNode, comment);
    } else {
      addDanglingComment(followingNode, comment);
    }
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the trueBody without brackets on, such as
  // if (a) /* comment */ true,
  // treat as a dangling comment if trueBody is a Block
  // treat as a leading comment otherwise
  if (enclosingNode.trueBody === followingNode) {
    if (followingNode.type === 'Block') {
      addDanglingComment(followingNode, comment);
    } else {
      addLeadingComment(followingNode, comment);
    }
    return true;
  }

  return false;
}

module.exports = handleIfStatementComments;
