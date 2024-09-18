import { util } from 'prettier';
import { prettierVersionSatisfies } from './prettier-version-satisfies.js';
import { locEnd } from './loc.js';

import type { AstPath } from 'prettier';
import type { utilV2 } from './types';
import type { AstNode, CollectionNode } from '../slang-nodes';

export const isPrettier2 = prettierVersionSatisfies('^2.3.0');

// The functions in this file will never be 100% covered in a single run
// since it depends on the version of Prettier being used.
// Mocking the behaviour will introduce a lot of maintenance in the tests.

export function isNextLineEmpty(text: string, startIndex: number): boolean {
  return isPrettier2
    ? (util as utilV2).isNextLineEmptyAfterIndex(text, startIndex)
    : util.isNextLineEmpty(text, startIndex); // V3 deprecated `isNextLineEmptyAfterIndex`
}

export function getNextNonSpaceNonCommentCharacter(
  text: string,
  node: AstNode
): string {
  if (isPrettier2) {
    const index = (util as utilV2).getNextNonSpaceNonCommentCharacterIndex(
      text,
      node,
      locEnd
    );
    return index === false ? '' : text.charAt(index);
  }
  return util.getNextNonSpaceNonCommentCharacter(text, locEnd(node)); // V3 exposes this function directly
}

export function isLast(path: AstPath<AstNode>, index: number): boolean {
  return isPrettier2
    ? index === (path.getParentNode() as CollectionNode).items.length - 1
    : path.isLast;
}
