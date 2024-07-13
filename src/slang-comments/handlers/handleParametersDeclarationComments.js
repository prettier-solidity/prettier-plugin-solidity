import { util } from 'prettier';

const { addDanglingComment, addLeadingComment, addTrailingComment } = util;

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}) {
  if (enclosingNode?.kind !== 'ParametersDeclaration') {
    return false;
  }

  if (precedingNode?.kind === 'Parameters') {
    if (precedingNode.items.length === 0) {
      addDanglingComment(precedingNode, comment);
    } else {
      addTrailingComment(
        precedingNode.items[precedingNode.items.length - 1],
        comment
      );
    }
    return true;
  }

  if (followingNode?.kind === 'Parameters') {
    if (followingNode.items.length === 0) {
      addDanglingComment(followingNode, comment);
    } else {
      addLeadingComment(followingNode.items[0], comment);
    }
    return true;
  }

  return false;
}
