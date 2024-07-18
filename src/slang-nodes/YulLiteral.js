import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';

const variants = { HexStringLiteral, StringLiteral };

export class YulLiteral extends SlangNode {
  get kind() {
    return NonterminalKind.YulLiteral;
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
