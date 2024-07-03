import { util } from 'prettier';

const { addDanglingComment, addLeadingComment } = util;

export default function handleBlockComments({
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}) {
  if (enclosingNode?.kind !== 'Block') {
    return false;
  }

  if (
    precedingNode?.kind === 'Statements' &&
    precedingNode.items.length === 0
  ) {
    addDanglingComment(precedingNode, comment);
    return true;
  }

  if (followingNode?.kind === 'Statements' && followingNode.items.length > 0) {
    addLeadingComment(followingNode.items[0], comment);
    return true;
  }

  return false;
}
