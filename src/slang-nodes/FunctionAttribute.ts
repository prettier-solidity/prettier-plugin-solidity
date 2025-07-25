import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class FunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | string;

  constructor(ast: ast.FunctionAttribute, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.ModifierInvocation:
          this.variant = new ModifierInvocation(
            ast.variant as ast.ModifierInvocation,
            options
          );
          break;
        case NonterminalKind.OverrideSpecifier:
          this.variant = new OverrideSpecifier(
            ast.variant as ast.OverrideSpecifier
          );
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    if (typeof this.variant !== 'string') this.updateMetadata(this.variant);
  }

  print(path: AstPath<FunctionAttribute>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
