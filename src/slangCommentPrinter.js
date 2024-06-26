import { doc } from 'prettier';
import { isBlockComment, isLineComment } from './common/slang-helpers.js';

const { hardline, join, literalline } = doc.builders;

function isIndentableBlockComment(comment) {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  const lines = comment.value.slice(1, -1).split('\n');
  return lines.length > 1 && lines.every((line) => line.trimStart()[0] === '*');
}

function printIndentableBlockComment(comment) {
  const lines = comment.value.split('\n');

  return join(
    hardline,
    lines.map((line, index) =>
      index === 0
        ? line.trimEnd()
        : ` ${index < lines.length - 1 ? line.trim() : line.trimStart()}`
    )
  );
}

export function printComment(commentPath) {
  const comment = commentPath.node;
  const { comments } = commentPath.getParentNode();

  // TODO: Prettier creates duplicates, research why this happens
  if (
    comments.some(
      (c) =>
        c.printed &&
        c.loc.start === comment.loc.start &&
        c.loc.end === comment.loc.end
    )
  ) {
    return '';
  }

  if (isLineComment(comment)) {
    return comment.value.trimEnd();
  }

  if (isBlockComment(comment)) {
    if (isIndentableBlockComment(comment)) {
      return printIndentableBlockComment(comment);
    }

    return join(literalline, comment.value.split('\n'));
  }

  throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
}
