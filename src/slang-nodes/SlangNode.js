import { Loc } from '../slang-utils/loc.js';
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
    const children = ast.cst.children();

    this.kind = ast.cst.kind;

    const childrenOffsets = getChildrenOffsets(children, offset, comments);

    const getValue = (astChild) =>
      astChild.type === 'Terminal'
        ? astChild.text
        : parse(astChild, childrenOffsets.shift());

    const childrenKeys = Object.keys(this).slice(3);

    childrenKeys.forEach((childKey) => {
      const astChild = ast[childKey];
      if (astChild) {
        this[childKey] = Array.isArray(astChild)
          ? astChild.map(getValue)
          : getValue(astChild);
      }
    });

    const startWithTrivia = offset;
    const endWithTrivia = offset + ast.cst.textLength.utf8;
    let leadingOffset = getLeadingOffset(children);
    let trailingOffset = getTrailingOffset(children);

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

    this.loc = new Loc({
      startWithTrivia,
      start: startWithTrivia + leadingOffset,
      endWithTrivia,
      end: endWithTrivia - trailingOffset
    });
  }
}
