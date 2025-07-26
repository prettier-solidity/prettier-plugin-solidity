import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
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

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new AddressType(variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ElementaryType>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
