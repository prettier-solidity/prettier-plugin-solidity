import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulLiteral implements SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  comments;

  loc;

  variant: HexStringLiteral | StringLiteral | string;

  constructor(ast: ast.YulLiteral, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

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

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulLiteral>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
