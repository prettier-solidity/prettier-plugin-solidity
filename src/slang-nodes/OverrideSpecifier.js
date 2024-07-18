import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { OverridePathsDeclaration } from './OverridePathsDeclaration.js';

export class OverrideSpecifier extends SlangNode {
  get kind() {
    return NonterminalKind.OverrideSpecifier;
  }

  overrideKeyword;

  overridden;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      overrideKeyword: ast.overrideKeyword.text,
      overridden: ast.overridden
        ? new OverridePathsDeclaration(
            ast.overridden,
            childrenOffsets.shift(),
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      this.overrideKeyword,
      this.overridden ? path.call(print, 'overridden') : ''
    ];
  }
}
