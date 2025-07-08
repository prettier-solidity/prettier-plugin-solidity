import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ModifierInvocation } from './ModifierInvocation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UnnamedFunctionAttribute implements SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttribute;

  comments;

  loc;

  variant: ModifierInvocation | string;

  constructor(
    ast: ast.UnnamedFunctionAttribute,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new ModifierInvocation(ast.variant, options);

    [this.loc, this.comments] = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );
  }

  print(path: AstPath<UnnamedFunctionAttribute>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
