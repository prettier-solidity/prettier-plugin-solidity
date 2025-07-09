import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ModifierAttribute extends SlangNode {
  readonly kind = NonterminalKind.ModifierAttribute;

  variant: OverrideSpecifier | string;

  constructor(ast: ast.ModifierAttribute) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new OverrideSpecifier(variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ModifierAttribute>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
