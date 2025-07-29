const { NonterminalKind, TerminalNode } = await import(
  '@nomicfoundation/slang/cst'
);
import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ElementaryType extends SlangNode {
  readonly kind = NonterminalKind.ElementaryType;

  variant: AddressType | string;

  constructor(ast: ast.ElementaryType) {
    super(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new AddressType(ast.variant);

    if (typeof this.variant !== 'string') this.updateMetadata(this.variant);
  }

  print(path: AstPath<ElementaryType>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
