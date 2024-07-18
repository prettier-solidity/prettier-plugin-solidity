import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
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
  get kind() {
    return NonterminalKind.TypeName;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
