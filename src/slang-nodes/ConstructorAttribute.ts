import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ModifierInvocation } from './ModifierInvocation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ConstructorAttribute implements SlangNode {
  readonly kind = NonterminalKind.ConstructorAttribute;

  comments;

  loc;

  variant: ModifierInvocation | string;

  constructor(ast: ast.ConstructorAttribute) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new ModifierInvocation(ast.variant);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ConstructorAttribute>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
