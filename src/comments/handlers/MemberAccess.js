const {
  util: { addDanglingComment }
} = require('prettier');

function handleMemberAccessComments(
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
) {
  if (enclosingNode && enclosingNode.type === 'MemberAccess') {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

module.exports = handleMemberAccessComments;
