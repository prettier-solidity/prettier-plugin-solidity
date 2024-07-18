import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

const variants = { ElementaryType, IdentifierPath };

export class MappingKeyType extends SlangNode {
  get kind() {
    return NonterminalKind.MappingKeyType;
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
