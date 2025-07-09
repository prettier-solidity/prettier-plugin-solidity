import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class UnnamedFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttribute;

  variant: ModifierInvocation | string;

  constructor(
    ast: ast.UnnamedFunctionAttribute,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new ModifierInvocation(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<UnnamedFunctionAttribute>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
