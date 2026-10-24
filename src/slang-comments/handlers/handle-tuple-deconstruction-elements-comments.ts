import { NonterminalKind } from '@nomicfoundation/slang/cst';
import {
  addDanglingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacter
} from '../../slang-utils/prettier-utils.ts';
import { locEnd } from '../../slang-utils/loc.ts';

import type { HandlerParams } from './types.d.ts';

export default function handleTupleDeconstructionElementsComments({
  text,
  precedingNode,
  enclosingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.TupleDeconstructionElements) {
    return false;
  }

  // An empty slot has no tokens, so Prettier would attach a comment in it to a
  // neighboring slot instead.
  // Only a comment followed by `,` closes a slot. Any other comment leads the
  // next member and is already attached to it:
  //   (/* closes the slot */, /* leads b */ uint b) = f();
  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

  if (nextCharacter !== ',') {
    return false;
  }

  if (
    precedingNode &&
    precedingNode.kind === NonterminalKind.TupleDeconstructionElement
  ) {
    if (precedingNode.member === undefined) {
      addDanglingComment(precedingNode, comment, false);
    } else {
      addTrailingComment(precedingNode.member, comment);
    }
    return true;
  }

  return false;
}
