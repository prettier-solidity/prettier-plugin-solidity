import { isComment } from '../common/slang-helpers.js';

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
        loc: {
          start: offset,
          end: offset + child.textLength.utf8
        }
      });
    }

    offset += child.textLength.utf8;
    return offsetsArray;
  }, []);
  return offsets;
}

const getLeadingOffset = (children) => {
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
};

const getTrailingOffset = (children) => getLeadingOffset(children.reverse());

export class SlangNode {
  kind;

  loc = {
    childrenOffsets: [],
    startWithTrivia: 0,
    start: 0,
    endWithTrivia: 0,
    end: 0
  };

  comments = [];

  constructor(ast, offset) {
    if (typeof offset === 'undefined') return;
    const children = ast.cst.children();
    this.kind = ast.cst.kind;
    this.loc.childrenOffsets = getOffsets(children, offset);
    this.loc.startWithTrivia = offset;
    this.loc.endWithTrivia = offset + ast.cst.textLength.utf8;
  }

  parseChildrenNodes(ast, parse) {
    const getValue = (astChild) =>
      astChild.type === 'Terminal'
        ? astChild.text
        : parse(astChild, this.nextChildOffset);

    Object.keys(this)
      .slice(3)
      .forEach((childNodeName) => {
        const astChild = ast[childNodeName];
        if (astChild) {
          if (Array.isArray(astChild)) {
            this[childNodeName] = astChild.map(getValue);
          } else {
            this[childNodeName] = getValue(astChild);
          }
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
  initializeLoc(ast) {
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

  get nextChildOffset() {
    return this.loc.childrenOffsets.shift();
  }

  collectComments() {
    this.comments = comments.splice(0);
  }
}
