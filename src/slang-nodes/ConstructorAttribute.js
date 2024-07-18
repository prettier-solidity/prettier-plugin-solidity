import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';

export class ConstructorAttribute extends SlangNode {
  get kind() {
    return NonterminalKind.ConstructorAttribute;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new ModifierInvocation(
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
