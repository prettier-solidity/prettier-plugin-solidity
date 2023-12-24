import { util } from 'prettier';
import { prettierVersionSatisfies } from './util.ts';

export const isPrettier2 = prettierVersionSatisfies('^2.3.0');

// The functions in this file will never be 100% covered in a single run
// since it depends on the version of Prettier being used.
// Mocking the behaviour will introduce a lot of maintenance in the tests.
export function isNextLineEmpty(text, startIndex) {
  return isPrettier2
    ? util.isNextLineEmptyAfterIndex(text, startIndex)
    : util.isNextLineEmpty(text, startIndex); // V3 deprecated `isNextLineEmptyAfterIndex`
}

export function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
  return isPrettier2
    ? util.getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd)
    : util.getNextNonSpaceNonCommentCharacterIndex(text, locEnd(node)); // V3 signature changed
}

export function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
  if (isPrettier2) {
    const index = util.getNextNonSpaceNonCommentCharacterIndex(
      text,
      node,
      locEnd
    );
    return index === false ? '' : text.charAt(index);
  }
  return util.getNextNonSpaceNonCommentCharacter(text, locEnd(node)); // V3 exposes this function directly
}

export const getNode = (path) => (isPrettier2 ? path.getValue() : path.node); // V3 deprecated `getValue`

export function isLast(path, key, index) {
  return isPrettier2
    ? index === path.getParentNode()[key].length - 1
    : path.isLast;
}
