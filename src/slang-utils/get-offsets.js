import { isComment } from './is-comment.js';
import { Loc } from './loc.js';

export function getChildrenOffsets(children, initialOffset, comments) {
  let offset = initialOffset;

  const offsets = children.reduce((offsetsArray, child) => {
    if (child.type === 'Nonterminal') {
      offsetsArray.push(offset);
    }
    if (child.type === 'Terminal' && isComment(child)) {
      // Since the fetching the comments and calculating offsets are both done
      // as we iterate over the children and the comment also depends on the
      // offset, it's hard to separate these responsibilities into different
      // functions.
      comments.push({
        kind: child.kind,
        value: child.text,
        loc: new Loc({
          startWithTrivia: offset,
          endWithTrivia: offset + child.textLength.utf8
        })
      });
    }

    offset += child.textLength.utf8;
    return offsetsArray;
  }, []);
  return offsets;
}

export function getLeadingOffset(children) {
  let offset = 0;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.type === 'Nonterminal') {
      // The node's content starts when we find the first non-terminal,
      // non-comment, non-whitespace token.
      return offset;
    }
    if (
      child.type === 'Terminal' &&
      !isComment(child) &&
      child.kind !== 'EndOfLine' &&
      child.kind !== 'Whitespace'
    ) {
      // The content of the node started if we find a non-comment,
      // non-whitespace token.
      return offset;
    }
    offset += child.textLength.utf8;
  }
  return offset;
}

export function getTrailingOffset(children) {
  return getLeadingOffset(children.reverse());
}
