import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionComparator } from './VersionComparator.js';
import { VersionSpecifiers } from './VersionSpecifiers.js';

const variants = {
  VersionRange,
  VersionComparator,
  VersionSpecifiers
};

export class VersionExpression extends SlangNode {
  get kind() {
    return NonterminalKind.VersionExpression;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new variants[ast.variant.cst.kind](
              ast.variant,
              childrenOffsets.shift(),
              options
            )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
