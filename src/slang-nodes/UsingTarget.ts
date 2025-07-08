import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class UsingTarget extends SlangNode {
  readonly kind = NonterminalKind.UsingTarget;

  variant: TypeName | string;

  constructor(ast: ast.UsingTarget, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new TypeName(ast.variant, options);

    this.updateMetadata(typeof this.variant === 'string' ? [] : [this.variant]);
  }

  print(path: AstPath<UsingTarget>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
