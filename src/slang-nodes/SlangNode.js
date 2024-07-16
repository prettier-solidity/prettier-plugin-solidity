import {
  getChildrenOffsets,
  getLeadingOffset,
  getTrailingOffset
} from '../slang-utils/get-offsets.js';

export class SlangNode {
  kind;

  loc;

  comments = [];

  initialize(ast, offset, comments, parse) {
    this.kind = ast.cst.kind;

    // Collect comments and get children offsets.
    const cstChildren = ast.cst.children();
    const childrenOffsets = getChildrenOffsets(cstChildren, offset, comments);

    // populate all children nodes
    // TODO: before moving to typescript, this should be moved to a fetch
    // function that returns static typed classes.
    function getValue(astChild) {
      return astChild.type === 'Terminal'
        ? astChild.text
        : parse(astChild, childrenOffsets.shift());
    }

    const childrenKeys = Object.keys(this).slice(3);

    childrenKeys.forEach((childKey) => {
      const astChild = ast[childKey];
      if (astChild) {
        this[childKey] = Array.isArray(astChild)
          ? astChild.map(getValue)
          : getValue(astChild);
      }
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
