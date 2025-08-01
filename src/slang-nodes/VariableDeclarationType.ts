import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class VariableDeclarationType extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationType;

  variant: TypeName | string;

  constructor(
    ast: ast.VariableDeclarationType,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new TypeName(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<VariableDeclarationType>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
