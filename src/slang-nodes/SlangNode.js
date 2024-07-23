import {
  getChildrenOffsets,
  getLeadingOffset,
  getTrailingOffset
} from '../slang-utils/get-offsets.js';

const isNotStringOrUndefined = (node) =>
  typeof node !== 'string' && typeof node !== 'undefined';

export class SlangNode {
  loc;

  comments = [];

  initialize(ast, offset, fetch, postProcess) {
    let properties;

    if (this.kind !== ast.cst.kind)
      throw new Error(
        `${this.kind} can only be initialized with an AST node of the same kind.`
      );
    // Collect comments and get children offsets.
    const cstChildren = ast.cst.children();
    const childrenOffsets = getChildrenOffsets(
      cstChildren,
      offset,
      this.comments
    );

    // populate all children nodes
    if (properties === undefined) {
      properties = fetch(childrenOffsets);
    }

    const propertyKeys = Object.keys(properties);
    const propertyValues = Object.values(properties);

    // Collect comments
    const childrenNodes = propertyValues.reduce((slangNodes, property) => {
      if (Array.isArray(property)) {
        slangNodes.push(...property.filter(isNotStringOrUndefined));
      } else if (isNotStringOrUndefined(property)) {
        slangNodes.push(property);
      }
      return slangNodes;
    }, []);

    childrenNodes.forEach((child) => {
      this.comments.push(...child.comments.splice(0));
    });

    // calculate correct loc object
    this.loc = {
      start: offset,
      end: offset + ast.cst.textLength.utf8,
      leadingOffset: getLeadingOffset(cstChildren),
      trailingOffset: getTrailingOffset(cstChildren)
    };

    if (this.loc.leadingOffset === 0 || this.loc.trailingOffset === 0) {
      for (let i = 0; i < propertyKeys.length; i += 1) {
        const childLoc = properties[propertyKeys[i]]?.loc;

        if (childLoc) {
          if (
            this.loc.leadingOffset === 0 &&
            childLoc.start - childLoc.leadingOffset === this.loc.start
          ) {
            this.loc.leadingOffset = childLoc.leadingOffset;
          }

          if (
            this.loc.trailingOffset === 0 &&
            childLoc.end + childLoc.trailingOffset === this.loc.end
          ) {
            this.loc.trailingOffset = childLoc.trailingOffset;
          }
        }
      }
    }

    this.loc.start += this.loc.leadingOffset;
    this.loc.end -= this.loc.trailingOffset;

    if (typeof postProcess === 'function') {
      properties = postProcess(properties);
    }

    propertyKeys.forEach((propertyKey) => {
      this[propertyKey] = properties[propertyKey];
    });
  }
}
