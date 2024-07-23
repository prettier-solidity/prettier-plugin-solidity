import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';

export class UnnamedFunctionAttribute extends SlangNode {
  get kind() {
    return NonterminalKind.UnnamedFunctionAttribute;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new ModifierInvocation(ast.variant, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
