import { doc } from 'prettier';
import {
  getNode,
  isLast,
  isNextLineEmpty,
  isPrettier2
} from './backward-compatibility.js';
import { printComment } from '../comments/printer.js';
import { locEnd } from './util.js';
import type { ASTNode, Comment } from '@solidity-parser/parser/src/ast-types';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { DocV2, PrintSeparatedOptions } from './types';

const { group, indent, join, line, softline, hardline } = doc.builders;

export const printComments = (
  node: ASTNode,
  path: AstPath,
  options: ParserOptions,
  filter: (comment: Comment) => boolean = (): true => true
): Doc[] => {
  if (!node.comments) return [];
  const document = join(
    line,
    path
      .map((commentPath) => {
        const comment = getNode(commentPath) as Comment;
        if (comment.trailing || comment.leading || comment.printed) {
          return '';
        }
        if (!filter(comment)) {
          return '';
        }
        comment.printed = true;
        return printComment(commentPath, options);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? (document as DocV2).parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
};

export function printPreservingEmptyLines(
  path: AstPath,
  key: string,
  options: ParserOptions,
  print: (path: AstPath) => Doc
): Doc[] {
  return path.map((childPath, index) => {
    const node = getNode(childPath) as ASTNode;

    return [
      // Only attempt to prepend an empty line if `node` is not the first item
      index > 0 &&
      // LabelDefinition adds a dedented line so we don't have to prepend a
      // hardline.
      node.type !== 'LabelDefinition'
        ? hardline
        : '',
      print(childPath),
      // Only attempt to append an empty line if `node` is not the last item
      !isLast(childPath, key, index) &&
      // Append an empty line if the original text already had an one after the
      // current `node`
      isNextLineEmpty(options.originalText, locEnd(node) + 1)
        ? hardline
        : ''
    ];
  }, key);
}

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
export const printSeparatedItem = (
  item: Doc,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = true
  }: PrintSeparatedOptions = {}
): Doc =>
  grouped
    ? group([indent([firstSeparator, item]), lastSeparator])
    : [indent([firstSeparator, item]), lastSeparator];

// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
export const printSeparatedList = (
  list: Doc[],
  {
    firstSeparator,
    separator = [',', line],
    lastSeparator,
    grouped
  }: PrintSeparatedOptions = {}
): Doc =>
  printSeparatedItem(join(separator, list), {
    firstSeparator,
    lastSeparator,
    grouped
  });
