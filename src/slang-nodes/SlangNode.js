import {
  getChildrenOffsets,
  getLeadingOffset,
  getTrailingOffset
} from '../slang-utils/get-offsets.js';

export class SlangNode {
  kind;

  loc;

  comments = [];

  initialize(ast, offset, fetch, comments) {
    this.kind = ast.cst.kind;

    // Collect comments and get children offsets.
    const cstChildren = ast.cst.children();
    const childrenOffsets = getChildrenOffsets(cstChildren, offset, comments);

    // populate all children nodes
    let children;

    this.fetch = () => {
      if (children === undefined) {
        children = fetch(childrenOffsets);
      }
      return children;
    };

    this.fetch();

    const childrenKeys = Object.keys(children);
    childrenKeys.forEach((childKey) => {
      this[childKey] = children[childKey];
    });

    // calculate correct loc object
    const startWithTrivia = offset;
    const endWithTrivia = offset + ast.cst.textLength.utf8;
    let leadingOffset = getLeadingOffset(cstChildren);
    let trailingOffset = getTrailingOffset(cstChildren);

    if (leadingOffset === 0 || trailingOffset === 0) {
      for (let i = 0; i < childrenKeys.length; i += 1) {
        const childLoc = this[childrenKeys[i]]?.loc;

        if (childLoc) {
          if (
            leadingOffset === 0 &&
            childLoc.startWithTrivia === startWithTrivia
          ) {
            leadingOffset = childLoc.start - startWithTrivia;
          }

          if (
            trailingOffset === 0 &&
            childLoc.endWithTrivia === endWithTrivia
          ) {
            trailingOffset = endWithTrivia - childLoc.end;
          }
        }
      }
    }

    this.loc = {
      startWithTrivia,
      start: startWithTrivia + leadingOffset,
      endWithTrivia,
      end: endWithTrivia - trailingOffset
    };
  }
}
