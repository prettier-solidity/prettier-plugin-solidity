import { util } from 'prettier';

const { addDanglingComment } = util;

export default function handleYulBlockComments({
  precedingNode,
  enclosingNode,
  comment
}) {
  if (
    enclosingNode?.kind !== 'YulBlock' &&
    precedingNode?.kind !== 'YulStatements'
  ) {
    return false;
  }

  if (precedingNode.items.length === 0) {
    addDanglingComment(precedingNode, comment);
    return true;
  }

  return false;
}
