import { util } from 'prettier';

export const {
  addDanglingComment,
  addLeadingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacter,
  isNextLineEmpty,
  makeString
} = util;
