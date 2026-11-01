import { NonterminalKind } from '@nomicfoundation/slang/cst';
import {
  addDanglingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacter
} from '../../slang-utils/prettier-utils.ts';
import { locEnd } from '../../slang-utils/loc.ts';

import type { HandlerParams } from './types.d.ts';

export default function handleTupleDeconstructionStatementComments({
  text,
  precedingNode,
  enclosingNode,
  comment
}: HandlerParams): boolean {
  if (enclosingNode?.kind !== NonterminalKind.TupleDeconstructionStatement) {
    return false;
  }

  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    locEnd(comment)
  );

  // A comment in the last slot falls outside of TupleDeconstructionElements,
  // since the trivia before `)` belongs to the statement:
  //   (uint a, /* last slot */) = f();
  // Comments after the `)` also have the elements as `precedingNode`, so only a
  // comment followed by `)` is in the last slot:
  //   (uint a, uint b) = /* not in the tuple */ f();
  if (nextCharacter !== ')') {
    return false;
  }

  if (
    precedingNode &&
    precedingNode.kind === NonterminalKind.TupleDeconstructionElements
  ) {
    // Items has always at least two elements. So we can safely use `at(-1)` to
    // get the last slot.
    const slot = precedingNode.items.at(-1)!;
    if (slot.member === undefined) {
      addDanglingComment(slot, comment, false);
    } else {
      addTrailingComment(slot.member, comment);
    }
    return true;
  }

  return false;
}
