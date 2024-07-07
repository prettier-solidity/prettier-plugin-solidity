import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../common/backward-compatibility.js';
import { locEnd } from '../../common/slang-helpers.js';

const { addTrailingComment } = util;

export default function handleWhileStatementComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}) {
  if (enclosingNode?.kind !== 'WhileStatement' || !followingNode) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   while (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    locEnd
  );
  if (nextCharacter === ')' || enclosingNode.condition === precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}
