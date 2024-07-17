import { SlangNode } from './SlangNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

const variants = {
  ArrayTypeName,
  FunctionType,
  MappingType,
  ElementaryType,
  IdentifierPath
};

export class TypeName extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();
    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant = new variants[variant.cst.kind](
        variant,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
