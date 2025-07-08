import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
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

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
      return;
    }
    this.variant = new ModifierInvocation(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<UnnamedFunctionAttribute>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
