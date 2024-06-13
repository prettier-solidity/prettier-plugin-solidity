import { util, version } from 'prettier';
import satisfies from 'semver/functions/satisfies.js';
import type { ASTNode, Comment } from '@solidity-parser/parser/src/ast-types';
import type { Doc, doc, ParserOptions } from 'prettier';
import type { QuoteRegex } from './types';

export const prettierVersionSatisfies = (range: string): boolean =>
  satisfies(version, range);

const double: QuoteRegex = { quote: '"', regex: /"/g };
const single: QuoteRegex = { quote: "'", regex: /'/g };

export function printString(
  rawContent: string,
  options: ParserOptions
): string {
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
    const numPreferredQuotes = (rawContent.match(preferred.regex) ?? []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) ?? []).length;

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

export function hasNodeIgnoreComment(node: ASTNode): boolean {
  return Boolean(
    node.comments?.some(
      (comment: Comment) => comment.value.trim() === 'prettier-ignore'
    )
  );
}

// see: https://github.com/prettier/prettier/blob/main/src/language-js/loc.js
function getRange(index: number, node: ASTNode | Comment): number {
  if (node.range) {
    return node.range[index];
  }
  if (node.type === 'ExpressionStatement' && node.expression?.range) {
    return node.expression.range[index];
  }
  return 0;
}

export function locEnd(node: ASTNode | Comment): number {
  return getRange(1, node);
}

export function locStart(node: ASTNode | Comment): number {
  return getRange(0, node);
}

export function isLabel(doc: Doc): doc is doc.builders.Label {
  return (doc as doc.builders.DocCommand).type === 'label';
}
