import { doc } from 'prettier';
import { isLabel } from '../slang-utils/is-label.js';
import { printGroupAndIndentIfBreakPair } from './print-group-and-indent-if-break-pair.js';

import type { Doc } from 'prettier';

const { label } = doc.builders;

export const memberAccessChainLabel = Symbol('MemberAccessChain');

export function printPossibleMemberAccessChainItem(
  operand: Doc,
  predicate: Doc
): Doc {
  // If we are at the end of a MemberAccessChain we should indent the
  // arguments accordingly.
  if (isLabel(operand, memberAccessChainLabel)) {
    // We wrap the expression in a label in case there is an IndexAccess or
    // a FunctionCall following Node.
    return label(
      memberAccessChainLabel,
      printGroupAndIndentIfBreakPair(operand.contents, predicate)
    );
  }

  return [operand, predicate].flat();
}
