import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
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

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
      return;
    }
    this.variant = new SimpleVersionLiteral(ast.variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<VersionLiteral>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
