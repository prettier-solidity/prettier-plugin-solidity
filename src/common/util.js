const { util, version } = require('prettier');
const satisfies = require('semver/functions/satisfies');

const prettierVersionSatisfies = (range) => satisfies(version, range);
const isPrettier2 = () => prettierVersionSatisfies('^2.3.0');

// The following functions will never be 100% covered in a single run
// since it depends on the version of Prettier being used.
// Mocking the behaviour will introduce a lot of maintenance in the tests.
/* c8 ignore start */
function isNextLineEmpty(text, startIndex) {
  return isPrettier2()
    ? util.isNextLineEmptyAfterIndex(text, startIndex)
    : util.isNextLineEmpty(text, startIndex); // V3 deprecated `isNextLineEmptyAfterIndex`
}

function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
  return isPrettier2()
    ? util.getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd)
    : util.getNextNonSpaceNonCommentCharacterIndex(text, locEnd(node)); // V3 signature changed
}

function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
  return isPrettier2()
    ? text.charAt(
        util.getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd)
      )
    : util.getNextNonSpaceNonCommentCharacter(text, locEnd(node)); // V3 exposes this function directly
}
/* c8 ignore stop */

function printString(rawContent, options) {
  const double = { quote: '"', regex: /"/g };
  const single = { quote: "'", regex: /'/g };

  const preferred = options.singleQuote ? single : double;
  const alternate = preferred === single ? double : single;

  let shouldUseAlternateQuote = false;

  // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (
    rawContent.includes(preferred.quote) ||
    rawContent.includes(alternate.quote)
  ) {
    const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;

    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  }

  const enclosingQuote = shouldUseAlternateQuote
    ? alternate.quote
    : preferred.quote;

  // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.
  return util.makeString(rawContent, enclosingQuote);
}

function hasNodeIgnoreComment(node) {
  return (
    node &&
    node.comments &&
    node.comments.length > 0 &&
    node.comments.some((comment) => comment.value.trim() === 'prettier-ignore')
  );
}

module.exports = {
  getNextNonSpaceNonCommentCharacter,
  getNextNonSpaceNonCommentCharacterIndex,
  isNextLineEmpty,
  isPrettier2,
  printString,
  prettierVersionSatisfies,
  hasNodeIgnoreComment
};
