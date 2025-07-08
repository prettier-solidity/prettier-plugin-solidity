import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class FunctionBody extends SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  variant: Block | string;

  constructor(ast: ast.FunctionBody, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
      return;
    }
    this.variant = new Block(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<FunctionBody>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
