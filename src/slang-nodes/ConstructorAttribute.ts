import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ModifierInvocation } from './ModifierInvocation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ConstructorAttribute implements SlangNode {
  readonly kind = NonterminalKind.ConstructorAttribute;

  comments;

  loc;

  variant: ModifierInvocation | string;

  constructor(ast: ast.ConstructorAttribute, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new ModifierInvocation(ast.variant, options);

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
