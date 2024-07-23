import {
  getChildrenOffsets,
  getLeadingOffset
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
    const leadingOffset = getLeadingOffset(cstChildren);
    const trailingOffset = getLeadingOffset(cstChildren.reverse());
    this.loc = {
      start: offset + leadingOffset,
      end: offset + ast.cst.textLength.utf8 - trailingOffset,
      leadingOffset,
      trailingOffset
    };

    if (leadingOffset === 0 || trailingOffset === 0) {
      for (let i = 0; i < propertyKeys.length; i += 1) {
        const childLoc = properties[propertyKeys[i]]?.loc;

        if (childLoc) {
          if (
            leadingOffset === 0 &&
            childLoc.start - childLoc.leadingOffset === this.loc.start
          ) {
            this.loc.leadingOffset = childLoc.leadingOffset;
            this.loc.start += childLoc.leadingOffset;
          }

          if (
            trailingOffset === 0 &&
            childLoc.end + childLoc.trailingOffset === this.loc.end
          ) {
            this.loc.trailingOffset = childLoc.trailingOffset;
            this.loc.end -= childLoc.trailingOffset;
          }
        }
      }
    }

    if (typeof postProcess === 'function') {
      properties = postProcess(properties);
    }

    propertyKeys.forEach((propertyKey) => {
      this[propertyKey] = properties[propertyKey];
    });
  }
}
