import { doc } from 'prettier';
import {
  isLast,
  isNextLineEmpty,
  isPrettier2
} from './backward-compatibility.js';

const { group, indent, join, line, softline, hardline } = doc.builders;

export const printComments = (node, path, options, filter = () => true) => {
  if (!node.comments) return '';
  const document = join(
    line,
    path
      .map((commentPath) => {
        const comment = commentPath.getValue();
        if (comment.trailing || comment.leading || comment.printed) {
          return null;
        }
        if (!filter(comment)) {
          return null;
        }
        comment.printed = true;
        return options.printer.printComment(commentPath, options);
      }, 'comments')
      .filter(Boolean)
  );

  // The following if statement will never be 100% covered in a single run
  // since it depends on the version of Prettier being used.
  // Mocking the behaviour will introduce a lot of maintenance in the tests.
  /* c8 ignore start */
  return isPrettier2
    ? document.parts // Prettier V2
    : document; // Prettier V3
  /* c8 ignore stop */
};

export function printPreservingEmptyLines(path, key, options, print) {
  const parts = [];
  path.each((childPath, index) => {
    const node = childPath.getValue();
    const nodeType = node.type;

    if (
      // Avoid adding a hardline at the beginning of the document.
      parts.length !== 0 &&
      // LabelDefinition adds a dedented line so we don't have to prepend a
      // hardline.
      nodeType !== 'LabelDefinition'
    ) {
      parts.push(hardline);
    }

    parts.push(print(childPath));

    // Only attempt to append an empty line if `node` is not the last item
    if (
      !isLast(childPath, key, index) &&
      isNextLineEmpty(options.originalText, options.locEnd(node) + 1)
    ) {
      // Append an empty line if the original text already had an one after
      // the current `node`
      parts.push(hardline);
    }
  }, key);

  return parts;
}

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
export const printSeparatedItem = (
  item,
  {
    firstSeparator = softline,
    lastSeparator = firstSeparator,
    grouped = true
  } = {}
) => {
  const document = [indent([firstSeparator, item]), lastSeparator];
  return grouped ? group(document) : document;
};

// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
export const printSeparatedList = (
  list,
  { firstSeparator, separator = [',', line], lastSeparator, grouped } = {}
) =>
  printSeparatedItem(join(separator, list), {
    firstSeparator,
    lastSeparator,
    grouped
  });
