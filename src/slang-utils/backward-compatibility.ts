import { util } from 'prettier';
import { prettierVersionSatisfies } from './prettier-version-satisfies.js';
import { locEnd } from './loc.js';

import type { AstPath } from 'prettier';
import type { utilV2 } from './types';
import type { AstNode, Comment } from '../types';

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
  node: AstNode | Comment
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

// TODO: remove undefined once we stop supporting prettier 2
export const getNode = (path: AstPath): AstNode | Comment | null | undefined =>
  (isPrettier2 ? path.getValue() : path.node) as
    | AstNode
    | Comment
    | null
    | undefined; // V3 deprecated `getValue`

export function isLast(path: AstPath, key: string, index: number): boolean {
  return isPrettier2
    ? index === path.getParentNode()[key].length - 1
    : path.isLast;
}
