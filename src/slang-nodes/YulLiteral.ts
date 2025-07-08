import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class YulLiteral extends SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | string;

  constructor(ast: ast.YulLiteral, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.HexStringLiteral:
          this.variant = new HexStringLiteral(
            ast.variant as ast.HexStringLiteral,
            options
          );
          break;
        case NonterminalKind.StringLiteral:
          this.variant = new StringLiteral(
            ast.variant as ast.StringLiteral,
            options
          );
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    if (typeof this.variant !== 'string') this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulLiteral>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
