import { util } from 'prettier';

export const {
  addDanglingComment,
  addLeadingComment,
  addTrailingComment,
  getNextNonSpaceNonCommentCharacter,
  getPreferredQuote,
  isNextLineEmpty,
  makeString
} = util;
