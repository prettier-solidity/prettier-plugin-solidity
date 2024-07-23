import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

export class ExperimentalFeature extends SlangNode {
  get kind() {
    return NonterminalKind.ExperimentalFeature;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new StringLiteral(ast.variant, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
