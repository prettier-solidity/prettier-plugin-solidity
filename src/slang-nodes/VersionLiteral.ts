import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { SimpleVersionLiteral } from './SimpleVersionLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.VersionLiteral;

  variant: SimpleVersionLiteral | string;

  constructor(ast: ast.VersionLiteral) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new SimpleVersionLiteral(variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<VersionLiteral>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
