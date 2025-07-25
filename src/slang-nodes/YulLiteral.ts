import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.YulLiteral['variant'], TerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<YulLiteral['variant'], string> {
  switch (variant.cst.kind) {
    case NonterminalKind.HexStringLiteral:
      return new HexStringLiteral(variant as ast.HexStringLiteral, options);
    case NonterminalKind.StringLiteral:
      return new StringLiteral(variant as ast.StringLiteral, options);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class YulLiteral extends SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | string;

  constructor(ast: ast.YulLiteral, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulLiteral>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
