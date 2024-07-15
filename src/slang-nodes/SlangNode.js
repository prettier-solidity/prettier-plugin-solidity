import { isComment } from '../slang-utils/is-comment.js';
import { Loc } from '../slang-utils/loc.js';

const comments = [];

function getOffsets(children, initialOffset) {
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

function getLeadingOffset(children) {
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

function getTrailingOffset(children) {
  return getLeadingOffset(children.reverse());
}

export class SlangNode {
  kind;

  loc;

  comments = [];

  constructor(ast, offset) {
    if (typeof offset === 'undefined') return;
    const children = ast.cst.children();
    this.kind = ast.cst.kind;
    this.loc = new Loc({
      startWithTrivia: offset,
      endWithTrivia: offset + ast.cst.textLength.utf8,
      childrenOffsets: getOffsets(children, offset)
    });
  }

  initialize(ast, parse) {
    const getValue = (astChild) =>
      astChild.type === 'Terminal'
        ? astChild.text
        : parse(astChild, this.loc.childrenOffsets.shift());

    Object.keys(this)
      .slice(3)
      .forEach((childKey) => {
        const astChild = ast[childKey];
        if (astChild) {
          this[childKey] = Array.isArray(astChild)
            ? astChild.map(getValue)
            : getValue(astChild);
        }
      });
  }

  /**
   * Leading and trailing Comments are considered by the parser as part of the
   * innermost possible node. For example if there is a comment just before a
   * variable assignment, the parser will consider the comment belongs to the
   * variable name instead of the whole statement.
   *
   * This behaviour creates erratic outcomes when the new line of a
   * SingleLineComment can trigger a group break or a prettier-ignore will
   * apply to a subset of the intended nodes.
   *
   * ```Solidity
   * // prettier-ignore
   * matrix = [
   *   0, 1, 2,
   *   3, 4, 5,
   *   6, 7, 8
   * ];
   * ```
   */
  finalize(ast) {
    const children = ast.cst.children();
    let leadingOffset = getLeadingOffset(children);
    let trailingOffset = getTrailingOffset(children);

    if (leadingOffset === 0 || trailingOffset === 0) {
      const childrenKeys = Object.keys(this).slice(3);
      for (let i = 0; i < childrenKeys.length; i += 1) {
        const childLoc = this[childrenKeys[i]]?.loc;

        if (childLoc) {
          if (
            leadingOffset === 0 &&
            childLoc.startWithTrivia === this.loc.startWithTrivia
          ) {
            leadingOffset = childLoc.start - childLoc.startWithTrivia;
          }

          if (
            trailingOffset === 0 &&
            childLoc.endWithTrivia === this.loc.endWithTrivia
          ) {
            trailingOffset = childLoc.endWithTrivia - childLoc.end;
          }
        }
      }
    }
    this.loc.start = this.loc.startWithTrivia + leadingOffset;
    this.loc.end = this.loc.endWithTrivia - trailingOffset;
  }

  collectComments() {
    this.comments = comments.splice(0);
  }
}
